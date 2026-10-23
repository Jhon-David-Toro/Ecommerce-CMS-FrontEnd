import { useEffect, useState } from "react";

import type { QueryState } from "./useQuery.types";

/**
 * Keeps the same reference while the value is deeply equal, so objects built on every render do not retrigger effects.
 *
 * @param value Value that may change identity between renders.
 * @returns The first reference of the value, until its content changes.
 */
export const useStableValue = <T>(value: T) => {
  const [stable, setStable] = useState(value);
  if (JSON.stringify(stable) !== JSON.stringify(value)) setStable(value);
  return stable;
};

/**
 * Runs an asynchronous loader and reports its result, ignoring answers that arrive after cleanup.
 *
 * @param load Loader to run.
 * @param onResult Receives the new state.
 * @returns A function that discards the pending answer.
 */
export const runQuery = <T>(load: () => Promise<T>, onResult: (state: QueryState<T>) => void) => {
  let isCurrent = true;
  load()
    .then((data) => isCurrent && onResult({ data, error: null, isLoading: false }))
    .catch(
      (error: unknown) =>
        isCurrent && onResult({ data: null, error: error instanceof Error ? error : new Error(String(error)), isLoading: false }),
    );
  return () => {
    isCurrent = false;
  };
};

/**
 * Loads data with an asynchronous function and exposes loading and error state.
 *
 * @param load Function that returns the data; pass a module-level function so its identity is stable.
 * @param args Argument of `load`; objects are compared by content.
 * @returns The data, the loading flag, the error and a function that loads again.
 */
export const useQuery = <T, A = void>(load: (args: A) => Promise<T>, args: A) => {
  const stableArgs = useStableValue(args);
  const [state, setState] = useState<QueryState<T>>({ data: null, error: null, isLoading: true });
  const [version, setVersion] = useState(0);

  useEffect(() => runQuery(() => load(stableArgs), setState), [load, stableArgs, version]);

  /**
   * Loads the data again, keeping the previous result on screen meanwhile.
   */
  const reload = () => setVersion((current) => current + 1);

  return { ...state, reload };
};

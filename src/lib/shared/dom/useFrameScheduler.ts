import { useCallback, useMemo, useRef } from "react";

/**
 * Schedules work for the next animation frame, replacing any frame still pending.
 *
 * @returns Stable `schedule` and `cancel` functions.
 */
export const useFrameScheduler = () => {
  const frameRef = useRef<number | null>(null);

  /**
   * Cancels the pending frame, if any.
   */
  const cancel = useCallback(() => {
    if (frameRef.current === null) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  /**
   * Runs `callback` on the next animation frame, dropping any earlier request.
   *
   * @param callback Work to run.
   */
  const schedule = useCallback(
    (callback: () => void) => {
      cancel();
      frameRef.current = requestAnimationFrame(callback);
    },
    [cancel],
  );

  return useMemo(() => ({ schedule, cancel }), [schedule, cancel]);
};

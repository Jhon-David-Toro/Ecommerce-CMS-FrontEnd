import { COUNTER_TICK_MS } from "./StatsCounter.constants";
import type { StartCounterParams } from "./StatsCounter.types";

/**
 * Counts from zero to a final value, reporting every step.
 *
 * @param params Counter options.
 * @param params.endValue Final value.
 * @param params.duration Time the count takes, in milliseconds.
 * @param params.onChange Receives every intermediate value and the final one.
 * @returns A function that stops the count.
 */
export const startCounter = ({ endValue, duration, onChange }: StartCounterParams) => {
  const step = Math.ceil(endValue / (duration / COUNTER_TICK_MS));
  let value = 0;

  const interval = setInterval(() => {
    value = Math.min(value + step, endValue);
    onChange(value);
    if (value === endValue) clearInterval(interval);
  }, COUNTER_TICK_MS);

  return () => clearInterval(interval);
};

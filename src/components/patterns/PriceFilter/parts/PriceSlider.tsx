import type { CSSProperties } from "react";

import { PRICE_BOUND_INDEX, PRICE_BOUND_LABELS, PRICE_LIMITS } from "../PriceFilter.constants";
import type { PriceSliderProps } from "../PriceFilter.types";

/**
 * PriceFilter/Slider: range input that moves one end of the price range.
 *
 * @param props Component props.
 * @param props.bound End of the range this slider moves.
 * @param props.priceRange Current price range.
 * @param props.onActivate Called when the user starts dragging this slider.
 * @param props.onDeactivate Called when the user stops dragging.
 * @param props.onChange Called with the bound and the value while dragging.
 * @returns The slider.
 */
export const PriceSlider = ({ bound, priceRange, onActivate, onDeactivate, onChange }: PriceSliderProps) => {
  const style = { "--min-value": priceRange[0], "--max-value": priceRange[1] } as CSSProperties;

  return (
    <input
      type="range"
      min={PRICE_LIMITS.min}
      max={PRICE_LIMITS.max}
      value={priceRange[PRICE_BOUND_INDEX[bound]]}
      aria-label={PRICE_BOUND_LABELS[bound]}
      onChange={(event) => onChange(bound, parseInt(event.target.value))}
      onMouseDown={() => onActivate(bound)}
      onMouseUp={onDeactivate}
      onTouchStart={() => onActivate(bound)}
      onTouchEnd={onDeactivate}
      style={style}
    />
  );
};

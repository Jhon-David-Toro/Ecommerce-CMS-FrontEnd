import type { CSSProperties } from "react";

import { PRICE_BOUND_INDEX, PRICE_BOUND_LABELS } from "../PriceFilter.constants";
import type { PriceSliderProps } from "../PriceFilter.types";

/**
 * PriceFilter/Slider: range input that moves one end of the price range.
 *
 * @param props Component props.
 * @param props.bound End of the range this slider moves.
 * @param props.priceRange Current price range.
 * @param props.bounds Lowest and highest price of the catalog.
 * @param props.onActivate Called when the user starts dragging this slider.
 * @param props.onDeactivate Called when the user stops dragging.
 * @param props.onChange Called with the bound and the value while dragging.
 * @returns The slider.
 */
export const PriceSlider = ({ bound, priceRange, bounds, onActivate, onDeactivate, onChange }: PriceSliderProps) => {
  const style = {
    "--min-value": priceRange[0],
    "--max-value": priceRange[1],
    "--limit-min": bounds[0],
    "--limit-max": bounds[1],
  } as CSSProperties;

  return (
    <input
      type="range"
      min={bounds[0]}
      max={bounds[1]}
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

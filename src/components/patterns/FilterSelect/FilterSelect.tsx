import type { FC } from "react";

import { SelectInput } from "@/components/ui/SelectInput";

import type { FilterSelectProps } from "./FilterSelect.types";

/**
 * FilterSelect: dropdown that narrows a table to one value.
 *
 * @param props Component props.
 * @param props.label Accessible name of the dropdown.
 * @param props.options Values to pick from.
 * @param props.value Selected value; empty means no filter.
 * @param props.onChange Called with the new value.
 * @returns The dropdown.
 */
export const FilterSelect: FC<FilterSelectProps> = ({ label, options, value, onChange }) => (
  <SelectInput label={label} options={options} value={value} onChange={(event) => onChange(event.target.value)} />
);

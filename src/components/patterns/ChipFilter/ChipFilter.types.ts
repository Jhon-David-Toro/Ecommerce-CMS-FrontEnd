export interface ChipOption {
  value: string;
  label: string;
}

export interface ChipFilterProps {
  label: string;
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
}

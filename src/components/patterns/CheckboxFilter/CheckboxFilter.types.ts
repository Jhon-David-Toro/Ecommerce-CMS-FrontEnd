export interface CheckboxFilterProps {
  title: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

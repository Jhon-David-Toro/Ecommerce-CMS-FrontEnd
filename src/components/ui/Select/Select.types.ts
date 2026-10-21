export interface SelectProps {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

export interface SelectListboxProps {
  value: string;
  options: readonly string[];
  onSelect: (option: string) => void;
}

export interface UseSelectParams {
  onChange: (value: string) => void;
}

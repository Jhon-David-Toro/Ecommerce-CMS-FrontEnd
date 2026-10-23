import type { SelectOption } from "@/components/ui/SelectInput/SelectInput.types";

export interface FilterSelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

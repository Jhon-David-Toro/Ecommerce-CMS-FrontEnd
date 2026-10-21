export interface StatsCounterProps {
  endValue: number;
  label: string;
  duration?: number;
}

export interface StartCounterParams {
  endValue: number;
  duration: number;
  onChange: (value: number) => void;
}

export interface PromoCodeFormProps {
  appliedCode: string;
  discountPercent: number;
  onApply: (code: string) => void;
}

export type PromoStatus = "none" | "valid" | "invalid";

export interface PromoFeedbackProps {
  appliedCode: string;
  discountPercent: number;
}

export interface PromoInputProps {
  value: string;
  onChange: (value: string) => void;
}

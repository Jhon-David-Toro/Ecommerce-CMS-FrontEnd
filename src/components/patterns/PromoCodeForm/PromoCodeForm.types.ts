export interface PromoCodeFormProps {
  appliedCode: string;
  discountPercent: number;
  onApply: (code: string) => void;
}

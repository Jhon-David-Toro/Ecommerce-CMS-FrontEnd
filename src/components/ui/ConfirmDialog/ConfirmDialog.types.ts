export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export type ConfirmDialogBodyProps = Omit<ConfirmDialogProps, "open">;

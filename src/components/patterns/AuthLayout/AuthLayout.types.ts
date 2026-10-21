import type { ReactNode, SubmitEvent } from "react";

export interface AuthLayoutForm {
  failure: string;
  isSubmitting: boolean;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

export interface AuthLayoutProps {
  title: string;
  subtitle: string;
  form: AuthLayoutForm;
  submitLabel: string;
  pendingLabel: string;
  footer: ReactNode;
  children: ReactNode;
}

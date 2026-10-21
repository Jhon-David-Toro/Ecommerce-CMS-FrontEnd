import type { ReactNode, SubmitEvent } from "react";

export interface AuthLayoutForm {
  failure: string;
  isSubmitting: boolean;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

export interface AuthFormProps {
  form: AuthLayoutForm;
  submitLabel: string;
  pendingLabel: string;
  children: ReactNode;
}

export interface AuthLayoutProps extends AuthFormProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
}

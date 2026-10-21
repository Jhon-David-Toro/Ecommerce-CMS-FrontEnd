import type { PublicUser } from "@/lib/auth/auth.types";

export interface ReviewFormProps {
  productId: number;
}

export interface ReviewFormValues {
  rating: string;
  text: string;
}

export interface ReviewFormBodyProps {
  productId: number;
  user: PublicUser;
}

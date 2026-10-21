"use client";

import Link from "next/link";

import { useAuth } from "@/lib/auth/useAuth";

import type { ReviewFormProps } from "./ReviewForm.types";
import { ReviewFormBody } from "./parts/ReviewFormBody";
import styles from "./ReviewForm.module.scss";

/**
 * ReviewForm: lets a signed-in shopper write a review, and asks everyone else to sign in first.
 *
 * @param props Component props.
 * @param props.productId Product being reviewed.
 * @returns The form or the invitation to sign in.
 */
export const ReviewForm = ({ productId }: ReviewFormProps) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className={styles.review__signin}>
        <Link href="/login">Sign in</Link> to write a review.
      </p>
    );
  }

  return <ReviewFormBody productId={productId} user={user} />;
};

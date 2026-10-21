import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { SelectInput } from "@/components/ui/SelectInput";
import { TextArea } from "@/components/ui/TextArea";

import { RATING_OPTIONS } from "../ReviewForm.constants";
import type { ReviewFormBodyProps } from "../ReviewForm.types";
import { useReviewForm } from "../hooks/useReviewForm";
import styles from "../ReviewForm.module.scss";

/**
 * ReviewForm/Body: rating and text fields that send a review for moderation.
 *
 * @param props Component props.
 * @param props.productId Product being reviewed.
 * @param props.user Signed-in shopper.
 * @returns The form.
 */
export const ReviewFormBody = (props: ReviewFormBodyProps) => {
  const form = useReviewForm(props);

  return (
    <form className={styles.review} onSubmit={form.handleSubmit} noValidate aria-label="Write a review">
      <h3 className={styles.review__title}>Write a review</h3>
      {form.notice.message && <Alert tone={form.notice.failed ? "error" : "success"}>{form.notice.message}</Alert>}
      <SelectInput label="Rating" options={RATING_OPTIONS} {...form.field("rating")} />
      <TextArea label="Your review" error={form.errors.text} {...form.field("text")} />
      <Button type="primary" size="small" text="Send review" typeAttribute="submit" />
    </form>
  );
};

import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { ActionButton } from "@/components/ui/ActionButton";

import type { ReviewActionsProps } from "../AdminReviews.types";
import styles from "../AdminReviews.module.scss";

/**
 * Reviews/Actions: the Approve, Reject and Delete buttons of a review row.
 *
 * @param props Component props.
 * @param props.review Review of the row.
 * @param props.onModerate Called with the review id and the new status.
 * @param props.onRemove Called with the review id.
 * @returns The buttons.
 */
export const ReviewActions = ({ review, onModerate, onRemove }: ReviewActionsProps) => (
  <div className={styles.actions}>
    <ActionButton
      label="Approve"
      icon={CheckIcon}
      tone="success"
      aria-label={`Approve review by ${review.author}`}
      onClick={() => onModerate(review.id, "approved")}
    />
    <ActionButton
      label="Reject"
      icon={XMarkIcon}
      aria-label={`Reject review by ${review.author}`}
      onClick={() => onModerate(review.id, "rejected")}
    />
    <ActionButton
      label="Delete"
      icon={TrashIcon}
      tone="danger"
      aria-label={`Delete review by ${review.author}`}
      onClick={() => onRemove(review.id)}
    />
  </div>
);

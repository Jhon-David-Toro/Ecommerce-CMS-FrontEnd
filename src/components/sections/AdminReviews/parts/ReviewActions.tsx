import type { ReviewActionsProps } from "../AdminReviews.types";

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
  <>
    <button type="button" onClick={() => onModerate(review.id, "approved")} aria-label={`Approve review by ${review.author}`}>
      Approve
    </button>{" "}
    <button type="button" onClick={() => onModerate(review.id, "rejected")} aria-label={`Reject review by ${review.author}`}>
      Reject
    </button>{" "}
    <button type="button" onClick={() => onRemove(review.id)} aria-label={`Delete review by ${review.author}`}>
      Delete
    </button>
  </>
);

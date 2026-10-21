import { Button } from "@/components/ui/Button";

import type { PaginationItemProps } from "../Pagination.types";
import styles from "../Pagination.module.scss";

/**
 * Pagination/Item: page button, or an ellipsis where pages are skipped.
 *
 * @param props Component props.
 * @param props.element Page element to draw.
 * @returns The page button or the ellipsis.
 */
export const PaginationItem = ({ element }: PaginationItemProps) =>
  element.isEllipsis ? (
    <span className={styles.ellipsis}>{element.content}</span>
  ) : (
    <Button
      type="tertiary"
      text={element.content.toString()}
      onClick={element.onClick}
      className={element.isActive ? styles.active : undefined}
      size="small"
      margin="zero"
      typeAttribute="button"
      ariaPressed={element.isActive}
    />
  );

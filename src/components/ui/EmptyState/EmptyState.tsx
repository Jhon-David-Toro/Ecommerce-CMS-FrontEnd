import type { EmptyStateProps } from "./EmptyState.types";
import styles from "./EmptyState.module.scss";

/**
 * EmptyState: message shown when there is nothing to list, with an optional action.
 *
 * @param props Component props.
 * @param props.title Short headline.
 * @param props.description Longer explanation.
 * @param props.action Element that offers a way forward, such as a button.
 * @returns The empty state.
 */
export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <section className={styles.empty}>
    <h2 className={styles.empty__title}>{title}</h2>
    {description && <p className={styles.empty__text}>{description}</p>}
    {action}
  </section>
);

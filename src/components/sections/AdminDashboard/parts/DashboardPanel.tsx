import type { DashboardPanelProps } from "../AdminDashboard.types";
import styles from "../AdminDashboard.module.scss";

/**
 * AdminDashboard/Panel: a titled section of the dashboard.
 *
 * @param props Component props.
 * @param props.id Id of the title, used to name the section.
 * @param props.title Title of the panel.
 * @param props.children Content of the panel.
 * @returns The section.
 */
export const DashboardPanel = ({ id, title, children }: DashboardPanelProps) => (
  <section aria-labelledby={id}>
    <h2 id={id} className={styles.panels__title}>
      {title}
    </h2>
    {children}
  </section>
);

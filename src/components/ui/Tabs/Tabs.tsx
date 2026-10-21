"use client";

import { useState } from "react";
import type { FC } from "react";

import { cx } from "@/lib/shared/classnames/cx";

import type { TabsProps } from "./Tabs.types";
import styles from "./Tabs.module.scss";

/**
 * Tabs: row of toggle buttons that picks one section of content.
 *
 * @param props Component props.
 * @param props.tabs Labels of the tabs.
 * @param props.initialTab Label of the tab that starts active.
 * @param props.onTabChange Called with the label of the tab the user picks.
 * @returns The tab bar.
 */
export const Tabs: FC<TabsProps> = ({ tabs, initialTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  /**
   * Activates a tab and reports it.
   *
   * @param tab Label of the picked tab.
   */
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cx(styles.tabs__tab, { [styles.active]: activeTab === tab })}
          aria-pressed={activeTab === tab}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

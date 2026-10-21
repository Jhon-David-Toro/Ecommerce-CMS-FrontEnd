'use client';

import { FC, useState } from 'react';
import { TabsProps } from './Tabs.types';
import clsx from 'clsx';
import { DEFAULT_TAB, TAB_LABELS } from '@/components/sections/ProductDetails/ProductDetails.constants';
import styles from './Tabs.module.scss';

export const Tabs: FC<TabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_TAB);
  const tabs = TAB_LABELS;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={clsx(styles.tabs__tab, { [styles.active]: activeTab === tab })}
          aria-pressed={activeTab === tab}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

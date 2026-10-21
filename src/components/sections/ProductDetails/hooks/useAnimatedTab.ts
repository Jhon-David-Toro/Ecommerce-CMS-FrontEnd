import { useState } from "react";

import { DEFAULT_TAB, TAB_SWITCH_DELAY_MS } from "../ProductDetails.constants";

/**
 * Keeps the active tab and a flag that restarts the content animation on every change.
 *
 * @returns The active tab, whether the content is ready to animate and the tab changer.
 */
export const useAnimatedTab = () => {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_TAB);
  const [animate, setAnimate] = useState(true);

  /**
   * Hides the content, then shows the chosen tab after a short delay.
   *
   * @param tab Tab to show.
   */
  const changeTab = (tab: string) => {
    setAnimate(false);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimate(true);
    }, TAB_SWITCH_DELAY_MS);
  };

  return { activeTab, animate, changeTab };
};

import { XMarkIcon } from "@heroicons/react/24/outline";

import type { BannerCloseProps } from "../Banner.types";
import styles from "../Banner.module.scss";

/**
 * Banner/Close: button that hides the banner.
 *
 * @param props Component props.
 * @param props.onClose Called when the button is pressed.
 * @returns The button.
 */
export const BannerClose = ({ onClose }: BannerCloseProps) => (
  <button type="button" className={styles.banner__close} aria-label="Close banner" onClick={onClose}>
    <XMarkIcon />
  </button>
);

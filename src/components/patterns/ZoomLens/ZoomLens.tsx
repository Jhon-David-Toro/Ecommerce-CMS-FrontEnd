import type { FC } from "react";

import type { ZoomLensProps } from "./ZoomLens.types";
import styles from "./ZoomLens.module.scss";

/**
 * ZoomLens: square that follows the pointer over the main image.
 *
 * @param props Component props.
 * @param props.lensPosition Top-left corner of the lens inside the image.
 * @returns The lens.
 */
export const ZoomLens: FC<ZoomLensProps> = ({ lensPosition }) => (
  <div className={styles.zoomLens} role="presentation" style={{ left: `${lensPosition.x}px`, top: `${lensPosition.y}px` }} />
);

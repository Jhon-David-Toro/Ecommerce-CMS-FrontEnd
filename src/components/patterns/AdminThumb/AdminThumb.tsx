import Image from "next/image";
import type { FC } from "react";

import { THUMB_SIZE } from "./AdminThumb.constants";
import type { AdminThumbProps } from "./AdminThumb.types";
import styles from "./AdminThumb.module.scss";

/**
 * AdminThumb: small square picture of a record in an admin table, or its first letter when it has no picture.
 *
 * @param props Component props.
 * @param props.src Address of the picture; may be empty.
 * @param props.name Name of the record, used for the fallback letter.
 * @returns The picture or the letter.
 */
export const AdminThumb: FC<AdminThumbProps> = ({ src, name }) =>
  src ? (
    <Image src={src} alt="" {...THUMB_SIZE} unoptimized className={styles.thumb} />
  ) : (
    <span className={styles.thumb} aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </span>
  );

"use client";

import Image from "next/image";
import Link from "next/link";

import { Skeleton } from "@/components/ui/Skeleton";
import { cx } from "@/lib/shared/classnames/cx";
import { useImageLoaded } from "@/lib/shared/dom/useImageLoaded";

import { CATEGORY_IMAGE_SIZE } from "../HomeCategory.constants";
import type { HomeCategoryCardProps } from "../HomeCategory.types";
import styles from "../HomeCategory.module.scss";

/**
 * HomeCategory/Card: category picture with its title, linking to the category page.
 *
 * @param props Component props.
 * @param props.category Category to show.
 * @returns The category card.
 */
export const HomeCategoryCard = ({ category }: HomeCategoryCardProps) => {
  const { isLoaded, onLoad } = useImageLoaded();

  return (
    <div className={cx(styles.category__card, { [styles.category__card_twoColumn]: category.twoColumn })}>
      {!isLoaded && <Skeleton />}
      <Link href={category.link} className={cx(styles.category__card_link, { [styles.loading]: !isLoaded })}>
        <h3 className={styles.category__card_title}>{category.title}</h3>
        <Image
          className={styles.category__card_image}
          src={category.image}
          alt={`Clothes ${category.title}`}
          {...CATEGORY_IMAGE_SIZE}
          onLoad={onLoad}
        />
      </Link>
    </div>
  );
};

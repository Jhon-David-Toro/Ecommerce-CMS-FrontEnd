"use client";

import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tabs } from "@/components/ui/Tabs";
import { cx } from "@/lib/shared/classnames/cx";

import { DEFAULT_TAB, TAB_LABELS } from "../ProductDetails.constants";
import type { ProductPageContentProps } from "../ProductDetails.types";
import { getProductTrail } from "../ProductDetails.utils";
import { useAnimatedTab } from "../hooks/useAnimatedTab";
import { ProductMain } from "./ProductMain";
import { ProductTabContent } from "./ProductTabContent";
import styles from "../ProductDetails.module.scss";

/**
 * ProductDetails/Content: breadcrumb, gallery and purchase info, tabbed content and recommendations of a product.
 *
 * @param props Component props.
 * @param props.product Product to show.
 * @param props.reviews Approved reviews of the product; null while they load.
 * @param props.related Products shown under the tabs.
 * @returns The page content.
 */
export const ProductPageContent = ({ product, reviews, related }: ProductPageContentProps) => {
  const { activeTab, animate, changeTab } = useAnimatedTab();

  return (
    <section className={styles.container}>
      <Breadcrumb items={getProductTrail(product.name)} />
      <ProductMain product={product} />
      <Tabs tabs={TAB_LABELS} initialTab={DEFAULT_TAB} onTabChange={changeTab} />
      <div className={cx(styles.tabContent, { [styles.animate]: animate })}>
        <ProductTabContent
          activeTab={activeTab}
          productId={product.id}
          description={product.description}
          reviews={reviews}
          faqs={product.faqs}
        />
      </div>
      <FeaturedProducts products={related} category="YOU MIGHT ALSO LIKE" />
    </section>
  );
};

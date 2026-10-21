"use client";

import mockProduct from "@/assets/mockProduct.json";
import { ProductImages } from "@/components/patterns/ProductImages";
import { ProductInfo } from "@/components/patterns/ProductInfo";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Tabs } from "@/components/ui/Tabs";
import { CATALOG_URLS } from "@/lib/catalog/catalog.constants";
import type { Catalog } from "@/lib/catalog/catalog.types";
import type { FAQ } from "@/lib/catalog/faq.types";
import type { ProductDetail } from "@/lib/catalog/productDetails.types";
import type { Review } from "@/lib/catalog/review.types";
import { cx } from "@/lib/shared/classnames/cx";
import { useFetchJson } from "@/lib/shared/http/useFetchJson";

import { useAnimatedTab } from "./hooks/useAnimatedTab";
import { ProductTabContent } from "./parts/ProductTabContent";
import { DEFAULT_TAB, TAB_LABELS } from "./ProductDetails.constants";
import styles from "./ProductDetails.module.scss";

/**
 * Product details: gallery, purchase info, tabbed content and recommendations.
 *
 * @returns The product page content.
 */
export const ProductDetails = () => {
  const product: ProductDetail = mockProduct;
  const reviews = useFetchJson<Review[]>(CATALOG_URLS.reviews);
  const faqs = useFetchJson<FAQ[]>(CATALOG_URLS.faqs);
  const catalog = useFetchJson<Catalog>(CATALOG_URLS.products);
  const { activeTab, animate, changeTab } = useAnimatedTab();

  return (
    <section className={styles.container}>
      <main className={styles.container__main}>
        <ProductImages mainImage={product.mainImage} additionalImages={product.additionalImages} />
        <ProductInfo product={product} />
      </main>
      <Tabs tabs={TAB_LABELS} initialTab={DEFAULT_TAB} onTabChange={changeTab} />
      <div className={cx(styles.tabContent, { [styles.animate]: animate })}>
        <ProductTabContent activeTab={activeTab} description={product.description} reviews={reviews} faqs={faqs} />
      </div>
      <FeaturedProducts products={catalog?.topSelling ?? []} category="YOU MIGHT ALSO LIKE" />
    </section>
  );
};

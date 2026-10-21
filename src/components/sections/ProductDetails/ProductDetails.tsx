"use client";

import { ProductImages } from "@/components/patterns/ProductImages";
import { ProductInfo } from "@/components/patterns/ProductInfo";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Tabs } from "@/components/ui/Tabs";
import { cx } from "@/lib/shared/classnames/cx";

import { DEFAULT_TAB, TAB_LABELS } from "./ProductDetails.constants";
import { useAnimatedTab } from "./hooks/useAnimatedTab";
import { useProductPage } from "./hooks/useProductPage";
import { ProductTabContent } from "./parts/ProductTabContent";
import styles from "./ProductDetails.module.scss";

/**
 * Product details: gallery, purchase info, tabbed content and recommendations.
 *
 * @returns The product page content.
 */
export const ProductDetails = () => {
  const { product, reviews, related, isLoading } = useProductPage();
  const { activeTab, animate, changeTab } = useAnimatedTab();

  if (isLoading) return <Spinner label="Loading product" />;

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="The product you are looking for does not exist or is no longer available."
        action={<Button type="primary" size="medium" text="Browse products" href="/products" typeAttribute="button" />}
      />
    );
  }

  return (
    <section className={styles.container}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/products" }, { label: product.name }]} />
      <main className={styles.container__main}>
        <ProductImages mainImage={product.image} additionalImages={product.images} />
        <ProductInfo product={product} />
      </main>
      <Tabs tabs={TAB_LABELS} initialTab={DEFAULT_TAB} onTabChange={changeTab} />
      <div className={cx(styles.tabContent, { [styles.animate]: animate })}>
        <ProductTabContent activeTab={activeTab} description={product.description} reviews={reviews} faqs={product.faqs} />
      </div>
      <FeaturedProducts products={related} category="YOU MIGHT ALSO LIKE" />
    </section>
  );
};

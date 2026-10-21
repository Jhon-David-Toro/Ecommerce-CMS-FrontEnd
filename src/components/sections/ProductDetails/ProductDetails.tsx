"use client";

import clsx from "clsx";

import { CATALOG_URLS } from "@/lib/catalog/catalog.constants";
import type { Catalog } from "@/lib/catalog/catalog.types";
import { useFetchJson } from "@/lib/shared/http/useFetchJson";

import mockProduct from "@/assets/mockProduct.json";
import FeaturedProducts from "@/components/sections/FeaturedProducts/FeaturedProducts";
import Faqs from "@/components/patterns/Faqs/Faqs";
import type { FAQ } from "@/lib/catalog/faq.types";
import ProductDescription from "@/components/patterns/ProductDescription/ProductDescription";
import ProductImages from "@/components/patterns/ProductImages/ProductImages";
import ProductInfo from "@/components/patterns/ProductInfo/ProductInfo";
import Reviews from "@/components/patterns/Reviews/Reviews";
import Tabs from "@/components/ui/Tabs/Tabs";
import { useAnimatedTab } from "./hooks/useAnimatedTab";
import type { Product } from "@/lib/catalog/productDetails.types";
import type { Review } from "@/components/patterns/Reviews/Reviews.types";
import { PRODUCT_TABS } from "./ProductDetails.constants";
import styles from "./ProductDetails.module.scss";

/**
 * Product details: gallery, purchase info, tabbed content and recommendations.
 *
 * @returns The product page content.
 */
const ProductDetails = () => {
  const product: Product = mockProduct;
  const reviews = useFetchJson<Review[]>(CATALOG_URLS.reviews);
  const faqs = useFetchJson<FAQ[]>(CATALOG_URLS.faqs);
  const catalog = useFetchJson<Catalog>(CATALOG_URLS.products);
  const { activeTab, animate, changeTab } = useAnimatedTab();

  const tabContent = {
    [PRODUCT_TABS.details]: <ProductDescription description={product.description} />,
    [PRODUCT_TABS.reviews]: <Reviews review={reviews ?? []} />,
    [PRODUCT_TABS.faqs]: <Faqs faqs={faqs ?? []} />,
  };

  return (
    <section className={styles.container}>
      <main className={styles.container__main}>
        <ProductImages mainImage={product.mainImage} additionalImages={product.additionalImages} />
        <ProductInfo product={product} />
      </main>
      <Tabs onTabChange={changeTab} />
      <div className={clsx(styles.tabContent, { [styles.animate]: animate })}>
        {tabContent[activeTab as keyof typeof tabContent]}
      </div>
      <FeaturedProducts products={catalog?.topSelling ?? []} category="YOU MIGHT ALSO LIKE" />
    </section>
  );
};

export default ProductDetails;

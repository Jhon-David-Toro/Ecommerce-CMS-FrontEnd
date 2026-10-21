"use client";

import clsx from "clsx";

import { CATALOG_URLS } from "@/lib/catalog/catalog.constants";
import type { Catalog } from "@/lib/catalog/catalog.types";
import { useFetchJson } from "@/lib/shared/http/useFetchJson";

import mockProduct from "../../../assets/mockProduct.json";
import FeaturedProducts from "../home/home-products/FeaturedProducts";
import Faqs from "./components/faqs/Faqs";
import type { FAQ } from "./components/faqs/interfaces/fag/faq.interface";
import ProductDescription from "./components/product-description/ProductDescription";
import ProductImages from "./components/product-images/ProductImages";
import ProductInfo from "./components/product-info/ProductInfo";
import Reviews from "./components/reviews/Reviews";
import Tabs from "./components/tabs/Tabs";
import { useAnimatedTab } from "./hooks/useAnimatedTab";
import type { Product } from "./interfaces/product-details/ProductDetails.interface";
import type { Review } from "./interfaces/reviews/Reviews.interface";
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

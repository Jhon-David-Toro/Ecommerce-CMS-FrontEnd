"use client";

import { CATALOG_URLS } from "@/lib/catalog/catalog.constants";
import type { Catalog } from "@/lib/catalog/catalog.types";
import { useFetchJson } from "@/lib/shared/http/useFetchJson";

import HappyCustomers from "@/app/modules/home/happy-customers/HappyCustomers";
import HomeCategories from "@/app/modules/home/home-categories/HomeCategories";
import HomeProducts from "@/app/modules/home/home-products/FeaturedProducts";
import Hero from "@/app/modules/home/hero/Hero";

/**
 * Home: hero, product highlights, categories and customer reviews.
 *
 * @returns The home page.
 */
export default function Home() {
  const catalog = useFetchJson<Catalog>(CATALOG_URLS.products);

  return (
    <>
      <Hero />
      <HomeProducts products={catalog?.newArrivals ?? []} category="New Arrivals" />
      <HomeProducts products={catalog?.topSelling ?? []} category="Top Selling" />
      <HomeCategories />
      <HappyCustomers />
    </>
  );
}

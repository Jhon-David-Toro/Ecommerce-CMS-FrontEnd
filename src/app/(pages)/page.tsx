"use client";

import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HappyCustomers } from "@/components/sections/HappyCustomers";
import { Hero } from "@/components/sections/Hero";
import { HomeCategories } from "@/components/sections/HomeCategories";
import { CATALOG_URLS } from "@/lib/catalog/catalog.constants";
import type { Catalog } from "@/lib/catalog/catalog.types";
import { useFetchJson } from "@/lib/shared/http/useFetchJson";

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
      <FeaturedProducts products={catalog?.newArrivals ?? []} category="New Arrivals" />
      <FeaturedProducts products={catalog?.topSelling ?? []} category="Top Selling" />
      <HomeCategories />
      <HappyCustomers />
    </>
  );
}

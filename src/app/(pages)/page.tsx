"use client";

import { CATALOG_URLS } from "@/lib/catalog/catalog.constants";
import type { Catalog } from "@/lib/catalog/catalog.types";
import { useFetchJson } from "@/lib/shared/http/useFetchJson";

import { HappyCustomers } from "@/components/sections/HappyCustomers";
import { HomeCategories } from "@/components/sections/HomeCategories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";

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

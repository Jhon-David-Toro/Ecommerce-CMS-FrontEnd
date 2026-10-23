"use client";

import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HappyCustomers } from "@/components/sections/HappyCustomers";
import { Hero } from "@/components/sections/Hero";
import { HomeCategories } from "@/components/sections/HomeCategories";
import { useHomeProducts } from "@/lib/catalog/useHomeProducts";
import { NEW_ARRIVALS_EMPTY, TOP_SELLING_EMPTY } from "./page.constants";

/**
 * Home: hero, product highlights, categories and customer reviews.
 *
 * @returns The home page.
 */
export default function Home() {
  const { newArrivals, topSelling, isLoading } = useHomeProducts();

  return (
    <>
      <Hero />
      <FeaturedProducts products={newArrivals} category="New Arrivals" isLoading={isLoading} emptyMessage={NEW_ARRIVALS_EMPTY} />
      <FeaturedProducts products={topSelling} category="Top Selling" isLoading={isLoading} emptyMessage={TOP_SELLING_EMPTY} />
      <HomeCategories />
      <HappyCustomers />
    </>
  );
}

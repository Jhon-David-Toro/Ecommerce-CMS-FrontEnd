"use client";

import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HappyCustomers } from "@/components/sections/HappyCustomers";
import { Hero } from "@/components/sections/Hero";
import { HomeCategories } from "@/components/sections/HomeCategories";
import { useHomeProducts } from "@/lib/catalog/useHomeProducts";

/**
 * Home: hero, product highlights, categories and customer reviews.
 *
 * @returns The home page.
 */
export default function Home() {
  const { newArrivals, topSelling } = useHomeProducts();

  return (
    <>
      <Hero />
      <FeaturedProducts products={newArrivals} category="New Arrivals" />
      <FeaturedProducts products={topSelling} category="Top Selling" />
      <HomeCategories />
      <HappyCustomers />
    </>
  );
}

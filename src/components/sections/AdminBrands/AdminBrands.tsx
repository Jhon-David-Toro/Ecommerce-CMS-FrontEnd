"use client";

import { TaxonomyManager } from "@/components/patterns/TaxonomyManager";

import { BRAND_CONFIG } from "./AdminBrands.constants";

/**
 * AdminBrands: list of brands with a form to create, edit and delete them.
 *
 * @returns The brands page content.
 */
export const AdminBrands = () => <TaxonomyManager config={BRAND_CONFIG} />;

"use client";

import { TaxonomyManager } from "@/components/patterns/TaxonomyManager";

import { CATEGORY_CONFIG } from "./AdminCategories.constants";

/**
 * AdminCategories: list of product categories with a form to create, edit and delete them.
 *
 * @returns The categories page content.
 */
export const AdminCategories = () => <TaxonomyManager config={CATEGORY_CONFIG} />;

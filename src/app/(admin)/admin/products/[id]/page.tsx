"use client";

import { useParams } from "next/navigation";

import { AdminProductForm } from "@/components/sections/AdminProductForm";

/**
 * Admin page to edit a product.
 *
 * @returns The product form filled with the product in the address.
 */
const EditProductPage = () => <AdminProductForm productId={Number(useParams<{ id: string }>().id)} />;

export default EditProductPage;

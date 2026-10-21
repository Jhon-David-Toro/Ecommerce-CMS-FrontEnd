import { Suspense } from "react";

import { AdminProducts } from "@/components/sections/AdminProducts";

/**
 * Admin products page.
 *
 * @returns The product list.
 */
const AdminProductsPage = () => (
  <Suspense>
    <AdminProducts />
  </Suspense>
);

export default AdminProductsPage;

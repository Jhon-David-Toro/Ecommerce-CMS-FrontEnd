import { Suspense } from "react";

import { Register } from "@/components/sections/Register";
import { Spinner } from "@/components/ui/Spinner";

/**
 * Register page.
 *
 * @returns The register form.
 */
const RegisterPage = () => (
  <Suspense fallback={<Spinner />}>
    <Register />
  </Suspense>
);

export default RegisterPage;

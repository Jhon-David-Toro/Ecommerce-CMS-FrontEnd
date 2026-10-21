import { Suspense } from "react";

import { Login } from "@/components/sections/Login";
import { Spinner } from "@/components/ui/Spinner";

/**
 * Login page.
 *
 * @returns The login form.
 */
const LoginPage = () => (
  <Suspense fallback={<Spinner />}>
    <Login />
  </Suspense>
);

export default LoginPage;

export const metadata = { title: "Sign in" };

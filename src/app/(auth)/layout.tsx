import type { ReactNode } from "react";

/**
 * Layout of the sign in and sign up pages: no banner, navigation or footer, so the form has the whole screen.
 *
 * @param props Component props.
 * @param props.children Page content.
 * @returns The page content.
 */
export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <main>{children}</main>;
}

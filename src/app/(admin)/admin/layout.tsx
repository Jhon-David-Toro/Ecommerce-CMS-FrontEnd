import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AuthGate } from "@/components/patterns/AuthGate";
import { AdminShell } from "@/components/sections/AdminShell";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

/**
 * Layout of the admin panel: only administrators get in.
 *
 * @param props Component props.
 * @param props.children Admin page content.
 * @returns The admin frame around the page.
 */
export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AuthGate role="admin">
      <AdminShell>{children}</AdminShell>
    </AuthGate>
  );
}

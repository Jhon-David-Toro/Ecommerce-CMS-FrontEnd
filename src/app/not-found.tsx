import { NotFoundPage } from "@/components/sections/NotFoundPage";

import { LayoutBody } from "./(pages)/layout";

/**
 * Page shown when no route matches the address, inside the storefront banner, navigation and footer.
 *
 * @returns The not found page.
 */
export default function NotFound() {
  return (
    <LayoutBody>
      <NotFoundPage />
    </LayoutBody>
  );
}

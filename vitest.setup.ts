import "@testing-library/jest-dom/vitest";
import "@/test/mocks/vercel-speed-insights";
import "@/test/mocks/vercel-analytics";
import "@/test/mocks/next-image";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

vi.mock("next/font/google", () => ({ Poppins: () => ({ className: "poppins" }) }));

vi.mock("next/navigation", () => ({
  useParams: vi.fn(() => ({})),
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() })),
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

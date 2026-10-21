import "@testing-library/jest-dom/vitest";
import "@/app/__mocks__/__shared-components__/vercel-speed-insights";
import "@/app/__mocks__/__shared-components__/vercel-analytics";
import "@/app/__mocks__/next/image/image";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

vi.mock("next/font/google", () => ({ Poppins: () => ({ className: "poppins" }) }));

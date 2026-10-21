import "@testing-library/jest-dom/vitest";
import "@/test/mocks/vercel-speed-insights";
import "@/test/mocks/vercel-analytics";
import "@/test/mocks/next-image";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

vi.mock("next/font/google", () => ({ Poppins: () => ({ className: "poppins" }) }));

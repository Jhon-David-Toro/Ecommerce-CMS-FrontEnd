import { vi } from "vitest";
vi.mock("@vercel/analytics/next", () => ({
    Analytics: () => <div data-testid="analytics" />,
}));
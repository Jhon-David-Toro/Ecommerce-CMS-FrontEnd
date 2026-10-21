import { vi } from "vitest";
vi.mock("@vercel/speed-insights/next", () => ({
    SpeedInsights: () => <div data-testid="speed-insights" />,
}));
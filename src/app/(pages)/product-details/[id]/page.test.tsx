import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductPage from "./page";

describe("ProductPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(useParams).mockReturnValue({ id: "1" });
  });

  it("renders the details of the product in the URL", async () => {
    render(<ProductPage />);
    expect(await screen.findByRole("heading", { level: 2, name: "One Life Graphic T-Shirt" })).toBeInTheDocument();
  });
});

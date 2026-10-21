import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Banner } from "./Banner";

describe(Banner.name, () => {
  it("Renders correctly with the message and link", () => {
    render(<Banner />);

    expect(screen.getByText(/Sign up and get 20% off to your first order/i)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Sign Up Now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/register");

    expect(screen.getByRole("button", { name: "Close banner" })).toBeInTheDocument();
  });

  it("hides itself when the shopper closes it", async () => {
    render(<Banner />);
    await userEvent.click(screen.getByRole("button", { name: "Close banner" }));
    expect(screen.queryByText(/Sign up and get 20%/i)).not.toBeInTheDocument();
  });
});

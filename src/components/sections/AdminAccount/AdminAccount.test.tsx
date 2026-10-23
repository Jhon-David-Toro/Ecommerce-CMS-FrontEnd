import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { AdminAccount } from "./AdminAccount";

describe("AdminAccount", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useAuthStore.setState({
      isReady: true,
      user: { id: 1, name: "Store Admin", email: "admin@shop.test", role: "admin", blocked: false, createdAt: 1 },
    });
  });

  it("shows the details and the password forms of the admin", () => {
    render(<AdminAccount />);
    expect(screen.getByRole("heading", { name: "Account settings" })).toBeInTheDocument();
    expect(screen.getByLabelText("Full name")).toHaveValue("Store Admin");
    expect(screen.getByRole("form", { name: "Your details" })).toBeInTheDocument();
  });

  it("remembers the email alerts", async () => {
    render(<AdminAccount />);
    await userEvent.click(screen.getByLabelText("Review waiting for moderation"));
    expect(JSON.parse(window.localStorage.getItem("shop.adminAlerts") ?? "{}").newReview).toBe(true);
  });
});

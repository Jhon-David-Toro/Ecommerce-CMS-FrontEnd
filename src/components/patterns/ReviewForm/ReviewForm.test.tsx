import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";
import { listReviews } from "@/lib/catalog/reviews.api";

import { ReviewForm } from "./ReviewForm";
import { toReviewInput, validateReview } from "./ReviewForm.utils";

describe("ReviewForm", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useAuthStore.setState({ user: null, isReady: true });
  });

  it("asks visitors to sign in", () => {
    render(<ReviewForm productId={1} />);
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/login");
  });

  it("sends a pending review from a signed-in shopper", async () => {
    useAuthStore.setState({
      isReady: true,
      user: { id: 2, name: "Sample Customer", email: "c@shop.test", role: "customer", blocked: false, createdAt: 1 },
    });
    render(<ReviewForm productId={1} />);
    await userEvent.click(screen.getByRole("button", { name: "Send review" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Write a few words");
    await userEvent.selectOptions(screen.getByLabelText("Rating"), "4");
    await userEvent.type(screen.getByLabelText("Your review"), "Great fit");
    await userEvent.click(screen.getByRole("button", { name: "Send review" }));
    expect(await screen.findByText(/will appear once it has been approved/)).toBeInTheDocument();
    const pending = await listReviews({ status: "pending" });
    expect(pending).toHaveLength(1);
    expect(pending[0]).toMatchObject({ author: "Sample Customer", rating: 4, text: "Great fit", productId: 1 });
  });
});

describe("review utils", () => {
  it("requires text", () => {
    expect(validateReview({ rating: "5", text: " " })).toHaveProperty("text");
    expect(validateReview({ rating: "5", text: "Nice" })).toEqual({});
  });

  it("builds a pending, unverified review", () => {
    expect(toReviewInput({ rating: "3", text: " ok " }, 7, "Ana")).toMatchObject({
      productId: 7,
      rating: 3,
      text: "ok",
      status: "pending",
      verified: false,
    });
  });
});

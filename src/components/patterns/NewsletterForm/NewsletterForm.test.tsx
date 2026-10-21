import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { subscriberRepository } from "@/lib/newsletter/newsletter.api";

import { NewsletterForm } from "./NewsletterForm";

describe("NewsletterForm", () => {
  beforeEach(() => window.localStorage.clear());

  it("rejects an email that is not valid", async () => {
    render(<NewsletterForm />);
    await userEvent.type(screen.getByLabelText("Email address"), "nope");
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(await subscriberRepository.list()).toHaveLength(0);
  });

  it("subscribes once and says so when repeated", async () => {
    render(<NewsletterForm />);
    await userEvent.type(screen.getByLabelText("Email address"), "ana@mail.test");
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText("Thanks for subscribing!")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Email address"), "ana@mail.test");
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText("You are already subscribed.")).toBeInTheDocument();
    expect(await subscriberRepository.list()).toHaveLength(1);
  });
});

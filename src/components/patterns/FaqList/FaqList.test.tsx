import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FaqList } from "./FaqList";

const faqs = [
  { id: "1", question: "What is your return policy?", answer: "You can return items within 30 days." },
  { id: "2", question: "Do you offer international shipping?", answer: "Yes, we ship worldwide." },
];

describe("FaqList", () => {
  it("renders one item per question", () => {
    render(<FaqList faqs={faqs} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /What is your return policy\?/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Do you offer international shipping\?/ })).toBeInTheDocument();
  });

  it("renders an empty list without questions", () => {
    render(<FaqList faqs={[]} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});

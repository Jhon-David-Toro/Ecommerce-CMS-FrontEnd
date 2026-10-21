import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Faqs } from "./Faqs";

describe("Faqs", () => {
  it("shows the title and the questions", () => {
    render(<Faqs faqs={[{ id: "1", question: "How long is shipping?", answer: "Three days." }]} />);
    expect(screen.getByRole("heading", { level: 2, name: "Frequently Asked Questions" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /How long is shipping\?/ })).toBeInTheDocument();
  });

  it("explains when there are no questions", () => {
    render(<Faqs faqs={[]} />);
    expect(screen.getByText("No FAQs available at this time.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("explains when the questions are missing", () => {
    render(<Faqs />);
    expect(screen.getByText("No FAQs available at this time.")).toBeInTheDocument();
  });
});

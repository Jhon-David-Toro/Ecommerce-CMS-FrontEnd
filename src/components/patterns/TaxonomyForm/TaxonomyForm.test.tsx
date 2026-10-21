import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TaxonomyForm } from "./TaxonomyForm";

const initial = { name: "", slug: "", picture: "", description: "", visible: true };

describe("TaxonomyForm", () => {
  it("requires a name", async () => {
    const onSubmit = vi.fn();
    render(<TaxonomyForm title="New" initial={initial} imageLabel="Image address" onSubmit={onSubmit} onCancel={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("alert")).toHaveTextContent("This field is required.");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits the values with a slug built from the name", async () => {
    const onSubmit = vi.fn();
    render(<TaxonomyForm title="New" initial={initial} imageLabel="Logo address" onSubmit={onSubmit} onCancel={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Name"), "Calvin Klein");
    await userEvent.click(screen.getByRole("checkbox", { name: "Visible in the store" }));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: "Calvin Klein", slug: "calvin-klein", visible: false }));
  });

  it("shows the description only when asked for", () => {
    const { rerender } = render(<TaxonomyForm title="New" initial={initial} imageLabel="Image" onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.queryByLabelText("Description")).not.toBeInTheDocument();
    rerender(<TaxonomyForm title="New" initial={initial} imageLabel="Image" withDescription onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("cancels", async () => {
    const onCancel = vi.fn();
    render(<TaxonomyForm title="New" initial={initial} imageLabel="Image" onSubmit={vi.fn()} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { createRepository } from "@/lib/mock/repository";

import { TaxonomyManager } from "./TaxonomyManager";
import type { TaxonomyConfig, TaxonomyRecord } from "./TaxonomyManager.types";
import { buildEmptyValues, describeEditing } from "./TaxonomyManager.utils";

interface Tag extends TaxonomyRecord {
  picture: string;
}

const repository = createRepository<Tag>("tags", () => [{ id: 1, name: "Sale", slug: "sale", visible: true, picture: "" }]);

const config: TaxonomyConfig<Tag> = {
  title: "Tags",
  description: "Labels for products.",
  singular: "tag",
  deleteNote: "Products keep their tags.",
  imageLabel: "Picture address",
  getImage: (tag) => tag.picture,
  load: () => repository.list(),
  repository,
  emptyValues: buildEmptyValues(),
  toValues: (tag) => ({ name: tag.name, slug: tag.slug, picture: tag.picture, description: "", visible: tag.visible }),
  toInput: (values) => ({ name: values.name, slug: values.slug, picture: values.picture, visible: values.visible }),
};

describe("TaxonomyManager", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the records and offers to create one", async () => {
    render(<TaxonomyManager config={config} />);
    expect(await screen.findByRole("cell", { name: "Sale" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New tag" })).toBeInTheDocument();
  });

  it("creates, edits and deletes a record", async () => {
    render(<TaxonomyManager config={config} />);
    await userEvent.click(await screen.findByRole("button", { name: "New tag" }));
    await userEvent.type(screen.getByLabelText("Name"), "Winter");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByRole("cell", { name: "Winter" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Edit Winter" }));
    expect(screen.getByRole("form", { name: "Edit Winter" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete Winter" }));
    expect(screen.getByText(/Products keep their tags\./)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByRole("cell", { name: "Sale" });
    expect(screen.queryByRole("cell", { name: "Winter" })).not.toBeInTheDocument();
  });
});

describe("describeEditing", () => {
  it("returns nothing when no record is being edited", () => {
    expect(describeEditing(null, config)).toBeNull();
  });

  it("describes a new record and an existing one", () => {
    expect(describeEditing("new", config)).toMatchObject({ key: "new", title: "New tag" });
    expect(describeEditing({ id: 7, name: "Old", slug: "old", visible: true, picture: "" }, config)).toMatchObject({
      key: 7,
      title: "Edit Old",
    });
  });
});

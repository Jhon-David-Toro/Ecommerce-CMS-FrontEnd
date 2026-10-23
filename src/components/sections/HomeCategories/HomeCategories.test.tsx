import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { listCategories } from "@/lib/taxonomy/taxonomy.api";

import { HomeCategories } from "./HomeCategories";
import { toHomeCategoryItems } from "./HomeCategories.utils";

vi.mock("@/lib/taxonomy/taxonomy.api", () => ({ listCategories: vi.fn() }));

const category = (id: number, name: string, image: string, visible = true) => ({
  id,
  name,
  slug: name.toLowerCase(),
  description: "",
  image,
  visible,
});

const categories = [
  category(1, "Casual", "https://res.cloudinary.com/x/casual.svg"),
  category(2, "Formal", "https://res.cloudinary.com/x/formal.svg"),
  category(3, "Hidden", "https://res.cloudinary.com/x/hidden.svg", false),
  category(4, "No picture", ""),
];

describe("HomeCategories", () => {
  beforeEach(() => vi.mocked(listCategories).mockResolvedValue(categories));

  it("shows the section title and a link for every visible category with a picture", async () => {
    render(<HomeCategories />);
    expect(await screen.findByRole("heading", { level: 2, name: /browse by dress style/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /casual/i })).toHaveAttribute("href", "/products?category=Casual");
  });

  it("stays hidden without categories to show", async () => {
    vi.mocked(listCategories).mockResolvedValue([]);
    const { container } = render(<HomeCategories />);
    await vi.waitFor(() => expect(listCategories).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it("makes the second and third cards of every row of four wide", () => {
    const many = Array.from({ length: 5 }, (_, index) => category(index, `C${index}`, "https://res.cloudinary.com/x/c.svg"));
    expect(toHomeCategoryItems(many).map((item) => item.twoColumn)).toEqual([false, true, true, false, false]);
  });
});

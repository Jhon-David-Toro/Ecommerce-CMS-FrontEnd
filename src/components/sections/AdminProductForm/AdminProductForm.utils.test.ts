import { describe, expect, it } from "vitest";

import { buildProduct } from "@/test/factories";

import { EMPTY_PRODUCT_FORM } from "./AdminProductForm.constants";
import { formatColors, formatFaqs, parseColors, parseFaqs, toFormValues, toProductInput, validateProduct } from "./AdminProductForm.utils";

const valid = { ...EMPTY_PRODUCT_FORM, name: "Shirt", category: "T-Shirts", brand: "Zara", price: "50", image: "/a.png" };

describe("colors and FAQs as text", () => {
  it("round-trips colors", () => {
    const colors = [
      { name: "Olive", hex: "#6B7280" },
      { name: "Navy", hex: "#1E3A8A" },
    ];
    expect(parseColors(formatColors(colors))).toEqual(colors);
  });

  it("uses the name as the color when no hex is given", () => {
    expect(parseColors("Black")).toEqual([{ name: "Black", hex: "black" }]);
  });

  it("round-trips questions and skips lines without an answer", () => {
    const faqs = [{ id: "1", question: "Is it soft?", answer: "Yes." }];
    expect(parseFaqs(formatFaqs(faqs))).toEqual(faqs);
    expect(parseFaqs("Only a question")).toEqual([]);
  });
});

describe("toFormValues and toProductInput", () => {
  it("starts with an empty draft for a new product", () => {
    expect(toFormValues()).toEqual(EMPTY_PRODUCT_FORM);
  });

  it("keeps the content of a product through the form", () => {
    const product = buildProduct({
      name: "Gradient Shirt",
      discountPrice: 80,
      price: 100,
      images: ["/b.png"],
      rating: 4.5,
      reviewsCount: 9,
    });
    const input = toProductInput(toFormValues(product), product);
    expect(input).toMatchObject({
      name: "Gradient Shirt",
      price: 100,
      discountPrice: 80,
      discount: 20,
      images: ["/b.png"],
      rating: 4.5,
      reviewsCount: 9,
    });
    expect(input.description).toEqual(product.description);
  });

  it("builds the slug from the name and clears the offer when empty", () => {
    const input = toProductInput({ ...valid, name: "Loose Fit Shorts", discountPrice: "" });
    expect(input).toMatchObject({ slug: "loose-fit-shorts", discountPrice: null, discount: 0, rating: 0 });
  });
});

describe("validateProduct", () => {
  it("accepts a complete form", () => {
    expect(validateProduct(valid)).toEqual({});
  });

  it("flags the missing required data", () => {
    const errors = validateProduct({ ...EMPTY_PRODUCT_FORM, sizes: [], colors: "" });
    expect(Object.keys(errors).sort()).toEqual(["brand", "category", "colors", "image", "name", "price", "sizes"]);
  });

  it("requires the offer price to be lower than the price", () => {
    expect(validateProduct({ ...valid, discountPrice: "60" }).discountPrice).toBe("The offer price must be lower than the price.");
  });
});

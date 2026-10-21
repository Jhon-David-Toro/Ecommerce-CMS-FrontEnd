import type { Color } from "@/lib/catalog/color.types";
import type { FAQ } from "@/lib/catalog/faq.types";
import type { Product, ProductInput } from "@/lib/catalog/product.types";
import { compact, minNumber, required } from "@/lib/shared/forms/validators";
import { slugify, toLines } from "@/lib/shared/text/text";

import { COLOR_SEPARATOR, EMPTY_PRODUCT_FORM, LINE_SEPARATOR } from "./AdminProductForm.constants";
import type { ProductFormValues } from "./AdminProductForm.types";

/**
 * Writes colors as one `Name,hex` line each.
 *
 * @param colors Colors of the product.
 * @returns The text for the colors field.
 */
export const formatColors = (colors: Color[]) => colors.map((color) => `${color.name}${COLOR_SEPARATOR}${color.hex}`).join("\n");

/**
 * Reads colors from `Name,hex` lines.
 *
 * @param text Text of the colors field.
 * @returns The colors; a line without hex uses its name as the color value.
 */
export const parseColors = (text: string): Color[] =>
  toLines(text).map((line) => {
    const [name, hex] = line.split(COLOR_SEPARATOR).map((part) => part.trim());
    return { name, hex: hex || name.toLowerCase() };
  });

/**
 * Writes questions as one `Question | Answer` line each.
 *
 * @param faqs Questions of the product.
 * @returns The text for the FAQs field.
 */
export const formatFaqs = (faqs: FAQ[]) => faqs.map((faq) => `${faq.question} ${LINE_SEPARATOR} ${faq.answer}`).join("\n");

/**
 * Reads questions from `Question | Answer` lines.
 *
 * @param text Text of the FAQs field.
 * @returns The questions with ids; lines without an answer are skipped.
 */
export const parseFaqs = (text: string): FAQ[] =>
  toLines(text)
    .map((line) => line.split(LINE_SEPARATOR).map((part) => part.trim()))
    .filter(([question, answer]) => question && answer)
    .map(([question, answer], index) => ({ id: String(index + 1), question, answer }));

/**
 * Builds the form values for a product, or the empty form for a new one.
 *
 * @param product Product to edit.
 * @returns The form values.
 */
export const toFormValues = (product?: Product): ProductFormValues =>
  product
    ? {
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        category: product.category,
        dressStyle: product.dressStyle,
        price: String(product.price),
        discountPrice: product.discountPrice === null ? "" : String(product.discountPrice),
        stock: String(product.stock),
        status: product.status,
        image: product.image,
        images: product.images.join("\n"),
        colors: formatColors(product.colors),
        sizes: product.sizes,
        overview: product.description.overview,
        features: product.description.features.join("\n"),
        origin: product.description.origin,
        companyName: product.description.company.name,
        companyDescription: product.description.company.description,
        careInstructions: product.description.careInstructions,
        faqs: formatFaqs(product.faqs),
      }
    : EMPTY_PRODUCT_FORM;

/**
 * Turns the form values into the data of a product.
 *
 * @param values Values typed by the admin.
 * @param existing Product being edited, which keeps its rating, reviews and creation date.
 * @returns The product input.
 */
export const toProductInput = (values: ProductFormValues, existing?: Product): ProductInput => {
  const price = Number(values.price);
  const discountPrice = values.discountPrice.trim() ? Number(values.discountPrice) : null;

  return {
    name: values.name.trim(),
    slug: slugify(values.slug || values.name),
    brand: values.brand,
    category: values.category,
    dressStyle: values.dressStyle,
    price,
    discountPrice,
    discount: discountPrice ? Math.round(100 - (discountPrice / price) * 100) : 0,
    rating: existing?.rating ?? 0,
    reviewsCount: existing?.reviewsCount ?? 0,
    image: values.image.trim(),
    images: toLines(values.images),
    colors: parseColors(values.colors),
    sizes: values.sizes,
    stock: Number(values.stock),
    status: values.status,
    createdAt: existing?.createdAt ?? Date.now(),
    description: {
      overview: values.overview.trim(),
      features: toLines(values.features),
      origin: values.origin.trim(),
      company: { name: values.companyName.trim(), description: values.companyDescription.trim() },
      careInstructions: values.careInstructions.trim(),
    },
    faqs: parseFaqs(values.faqs),
  };
};

/**
 * Checks the product form.
 *
 * @param values Values typed by the admin.
 * @returns The errors by field; empty when everything is valid.
 */
export const validateProduct = (values: ProductFormValues) =>
  compact({
    name: required(values.name),
    category: required(values.category, "Choose a category."),
    brand: required(values.brand, "Choose a brand."),
    price: minNumber(values.price, 0.01),
    discountPrice:
      values.discountPrice.trim() && Number(values.discountPrice) >= Number(values.price)
        ? "The offer price must be lower than the price."
        : undefined,
    stock: minNumber(values.stock, 0),
    image: required(values.image, "Add the address of the main image."),
    sizes: values.sizes.length ? undefined : "Choose at least one size.",
    colors: parseColors(values.colors).length ? undefined : "Add at least one color.",
  });

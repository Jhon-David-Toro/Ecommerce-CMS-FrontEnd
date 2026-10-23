import { slugify } from "@/lib/shared/text/text";

import { EMPTY_DESCRIPTION } from "./catalog.constants";
import {
  API_STATUS_TO_FRONT,
  EMPTY_DETAIL,
  FALLBACK_HEX,
  HEX_PATTERN,
  MAX_SKU_LENGTH,
  NAMED_HEX,
  PLACEHOLDER_COLOR,
  PLACEHOLDER_SIZE,
  SHORT_HEX_PATTERN,
} from "./catalog.remote.constants";
import type { ApiProduct, ApiProductRequest, ApiProductSummary, ApiVariantRequest, TaxonomyIds } from "./catalog.remote.types";
import type { Color } from "./color.types";
import type { Product, ProductInput } from "./product.types";

/**
 * Turns any color text of the store (a name such as "white" or a short hex) into the 6-digit hex the API needs.
 *
 * @param hex Color as written in the store.
 * @returns A hex such as `#FFFFFF`.
 */
export const normalizeHex = (hex: string) => {
  const text = hex.trim();
  if (HEX_PATTERN.test(text)) return text;
  const short = SHORT_HEX_PATTERN.exec(text);
  if (short) return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
  return NAMED_HEX[text.toLowerCase()] ?? FALLBACK_HEX;
};

/**
 * Splits a total stock between the variants of a product; the first ones take the remainder.
 *
 * @param total Total units.
 * @param parts Number of variants.
 * @returns The units of each variant.
 */
export const splitStock = (total: number, parts: number) => {
  const base = Math.floor(total / parts);
  const remainder = total % parts;
  return Array.from({ length: parts }, (_, index) => base + (index < remainder ? 1 : 0));
};

/**
 * Builds the SKU of a color and size of a product.
 *
 * @param slug Slug of the product.
 * @param color Color name.
 * @param size Size.
 * @returns An upper case SKU.
 */
export const buildSku = (slug: string, color: string, size: string) =>
  `${slug}-${slugify(color)}-${slugify(size)}`.toUpperCase().slice(0, MAX_SKU_LENGTH);

/**
 * Builds one variant for each color and size, sharing the stock of the product.
 *
 * @param input Product data of the form.
 * @returns The variants.
 */
export const buildVariants = ({
  slug,
  colors,
  sizes,
  stock,
}: Pick<ProductInput, "slug" | "colors" | "sizes" | "stock">): ApiVariantRequest[] => {
  const colorNames = colors.length ? colors.map((color) => color.name) : [PLACEHOLDER_COLOR.name];
  const sizeNames = sizes.length ? sizes : [PLACEHOLDER_SIZE];
  const pairs = colorNames.flatMap((color) => sizeNames.map((size) => ({ color, size })));
  const shares = splitStock(stock, pairs.length);

  return pairs.map((pair, index) => ({ ...pair, sku: buildSku(slug, pair.color, pair.size), stock: shares[index] }));
};

/**
 * Builds the images of a request: the main picture first and then the extra ones.
 *
 * @param input Product data of the form.
 * @returns The images, without blank addresses.
 */
export const buildImages = ({ name, image, images }: Pick<ProductInput, "name" | "image" | "images">) =>
  [image, ...images].filter((url) => url.trim() !== "").map((url, index) => ({ imageUrl: url.trim(), alt: name, main: index === 0 }));

/**
 * Splits the prices of the form into the current and compare-at prices of the API; a discount only counts when it is lower.
 *
 * @param input Product data of the form.
 * @returns The current and the compare-at price.
 */
export const toApiPrices = ({ price, discountPrice }: Pick<ProductInput, "price" | "discountPrice">) => {
  const onSale = discountPrice !== null && discountPrice > 0 && discountPrice < price;
  return { price: onSale ? discountPrice : price, compareAtPrice: onSale ? price : null };
};

/**
 * Builds the colors of a request, with the placeholder color when the product has none.
 *
 * @param colors Colors of the form.
 * @returns Colors with a hex the API accepts.
 */
export const buildColors = (colors: Color[]) =>
  (colors.length ? colors : [PLACEHOLDER_COLOR]).map((color) => ({ name: color.name, hex: normalizeHex(color.hex) }));

/**
 * Builds the detail, features and questions of a request.
 *
 * @param input Product data of the form.
 * @returns The content part of the request.
 */
export const toApiContent = ({ description, faqs }: Pick<ProductInput, "description" | "faqs">) => ({
  detail: {
    overview: description.overview,
    origin: description.origin,
    companyName: description.company.name,
    aboutCompany: description.company.description,
    careInstructions: description.careInstructions,
  },
  features: description.features.filter((feature) => feature.trim() !== ""),
  faqs: faqs.filter((faq) => faq.question.trim() !== "" && faq.answer.trim() !== "").map(({ question, answer }) => ({ question, answer })),
});

/**
 * Turns the data of the product form into the body the API expects.
 *
 * @param input Product data of the form.
 * @param ids Ids of the category and the brand it belongs to.
 * @returns The request body.
 */
export const toProductRequest = (input: ProductInput, { categoryId, brandId }: TaxonomyIds): ApiProductRequest => ({
  name: input.name,
  slug: input.slug,
  shortDescription: input.description.overview.slice(0, 1000),
  ...toApiPrices(input),
  categoryId,
  brandId,
  dressStyle: input.dressStyle,
  images: buildImages(input),
  colors: buildColors(input.colors),
  sizes: (input.sizes.length ? input.sizes : [PLACEHOLDER_SIZE]).map((size) => ({ name: size, value: size })),
  variants: buildVariants(input),
  ...toApiContent(input),
});

/**
 * Computes the discount percentage between the regular and the current price.
 *
 * @param regular Regular price.
 * @param current Current price.
 * @returns A whole percentage.
 */
export const discountPercent = (regular: number, current: number) => Math.round(((regular - current) / regular) * 100);

/**
 * Splits the prices of the API (current and compare-at) into the regular and discount prices of the store.
 *
 * @param price Current price.
 * @param compareAtPrice Price before the discount, or null.
 * @returns The regular price, the discount price and the percentage.
 */
export const toStorePrices = (price: number, compareAtPrice: number | null) =>
  compareAtPrice
    ? { price: compareAtPrice, discountPrice: price, discount: discountPercent(compareAtPrice, price) }
    : { price, discountPrice: null, discount: 0 };

/**
 * Removes the placeholder color that stands for "no colors".
 *
 * @param colors Colors of the API.
 * @returns The colors the admin really chose.
 */
export const realColors = (colors: { name: string; hex: string }[]): Color[] =>
  colors.filter((color) => color.name !== PLACEHOLDER_COLOR.name).map(({ name, hex }) => ({ name, hex }));

/**
 * Turns a missing text into an empty one.
 *
 * @param value Text that may be null.
 * @returns The text, or an empty string.
 */
export const orEmpty = (value: string | null) => value ?? "";

/**
 * Picks the main picture of a product of the admin API and the other ones.
 *
 * @param product Complete product of the admin API.
 * @returns The main image address and the extra ones.
 */
export const splitImages = (product: ApiProduct) => {
  const main = product.images.find((image) => image.main) ?? product.images[0];
  return {
    image: main?.imageUrl ?? product.thumbnailUrl ?? "",
    images: product.images.filter((image) => image !== main).map((image) => image.imageUrl),
  };
};

/**
 * Builds the description of the store from the detail and the features of the admin API.
 *
 * @param product Complete product of the admin API.
 * @returns The description.
 */
export const toStoreDescription = ({ detail, features }: ApiProduct) => {
  const { overview, origin, companyName, aboutCompany, careInstructions } = detail ?? EMPTY_DETAIL;

  return {
    overview: orEmpty(overview),
    features,
    origin: orEmpty(origin),
    company: { name: orEmpty(companyName), description: orEmpty(aboutCompany) },
    careInstructions: orEmpty(careInstructions),
  };
};

/**
 * Turns a product of the admin API into a product of the store.
 *
 * @param product Complete product of the admin API.
 * @returns The product in the shape of the store.
 */
export const fromAdminProduct = (product: ApiProduct): Product => {
  const { image, images } = splitImages(product);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: orEmpty(product.brandName),
    category: orEmpty(product.categoryName),
    dressStyle: orEmpty(product.dressStyle),
    ...toStorePrices(product.price, product.compareAtPrice),
    rating: product.ratingAverage,
    reviewsCount: product.ratingCount,
    image,
    images,
    colors: realColors(product.colors),
    sizes: product.sizes.map((size) => size.name).filter((size) => size !== PLACEHOLDER_SIZE),
    stock: product.stock,
    status: API_STATUS_TO_FRONT[product.status],
    createdAt: product.createdAt,
    description: toStoreDescription(product),
    faqs: product.faqs.map((faq, index) => ({ id: `faq-${product.id}-${index}`, ...faq })),
  };
};

/**
 * Turns a row of the admin list into a product of the store; the fields the list does not carry stay empty.
 *
 * @param summary Row of the admin list.
 * @returns The product in the shape of the store.
 */
export const fromAdminSummary = (summary: ApiProductSummary): Product => ({
  id: summary.id,
  name: summary.name,
  slug: summary.slug,
  brand: summary.brandName ?? "",
  category: summary.categoryName ?? "",
  dressStyle: "",
  ...toStorePrices(summary.price, summary.compareAtPrice),
  rating: 0,
  reviewsCount: 0,
  image: summary.thumbnailUrl ?? "",
  images: [],
  colors: [],
  sizes: [],
  stock: summary.stock,
  status: API_STATUS_TO_FRONT[summary.status],
  createdAt: summary.createdAt,
  description: EMPTY_DESCRIPTION,
  faqs: [],
});

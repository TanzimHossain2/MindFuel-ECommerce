import { IProductDetail, ShopifyProduct, IProduct } from "../../types/product";

export function transformShopifyProduct(product: ShopifyProduct): IProduct {
  // Extract the first variant as the default
  const defaultVariant = product.variants[0];

  return {
    id: product.id,
    imgSrc: product.images[0]?.src || "",
    imgHoverSrc: product.images[1]?.src || product.images[0]?.src || "",
    description: product.body_html,
    title: product.title,
    price: parseFloat(defaultVariant.price),
    quantity: defaultVariant.inventory_quantity,
    isAvailable: defaultVariant.inventory_quantity > 0,
    brand: product.vendor,
    sizes: [defaultVariant.grams.toString()],
    countdown: null,
    filterCategories: product.tags.split(",").map((tag) => tag.trim()),
    variantId: defaultVariant.id,
    weight: defaultVariant.weight,
    originalPrice: defaultVariant.compare_at_price || defaultVariant.price,
  };
}

export function transformProductDetails(product: any): IProductDetail {
  const firstVariant = product.variants[0] || {};

  return {
    id: product.id,
    imgSrc: product.image?.src || "",
    imgHoverSrc:
      product.images.length > 1
        ? product.images[1]?.src
        : product.image?.src || "",
    title: product.title,
    description: product.body_html || "",
    tags: product.tags?.split(", ") || [],
    weight: firstVariant.grams || 0,
    variantId: firstVariant.id,
    price: parseFloat(firstVariant.price) || 0,
    originalPrice: parseFloat(
      firstVariant.compare_at_price || firstVariant.price
    ),
    quantity: firstVariant.inventory_quantity || 0,
    isAvailable: firstVariant.inventory_quantity > 0,
    brand: product.vendor,
    sizes: [firstVariant.grams.toString()],
    countdown: null,
    filterCategories: product.tags?.split(", ") || [],
    rating: 4.5,
    numReviews: 120,
    images: product.images.map((image: { src: any }) => image.src),
  };
}

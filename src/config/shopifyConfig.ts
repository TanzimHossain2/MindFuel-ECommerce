export const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
export const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

export const shopifyHeaders: HeadersInit = {
  "Content-Type": "application/json",
  "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN!,
};

export const SHOPIFY_API_VERSION = "2024-10";

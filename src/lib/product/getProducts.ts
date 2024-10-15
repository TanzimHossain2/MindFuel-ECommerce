import {
  SHOPIFY_API_VERSION,
  SHOPIFY_STORE_URL,
  shopifyHeaders,
} from "@/config";

export async function getProducts() {
  try {
    const url = `${SHOPIFY_STORE_URL}/admin/api/${SHOPIFY_API_VERSION}/products.json`;
    const product = await fetch(url, {
      method: "GET",
      headers: shopifyHeaders,
      cache: "no-cache",
    });

    const productData = await product.json();

    return productData;
  } catch (err) {
    console.log(err);
  }
}

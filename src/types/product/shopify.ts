export interface ShopifyVariant {
  grams: number;
  id: number;
  price: string;
  inventory_quantity: number;
  compare_at_price: string | null;
  weight: number;
  weight_unit: string;
  // Add other necessary fields
}

// Shopify API Product Image
export interface ShopifyImage {
  id: number;
  src: string;
  alt: string | null;
}

// Shopify API Product
export interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
}

// Template Product for All Products List
export interface IProduct {
  id: number;
  imgSrc: string;
  imgHoverSrc: string;
  title: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  brand: string;
  sizes: string[] | string;
  countdown: string | null;
  filterCategories: string[];
  variantId: number;
  weight: number;
  originalPrice: number;
  description: string;
}

// Template Product for Product Page
export interface IProductDetail extends IProduct {
  tags: string[];
  rating: number;
  numReviews: number;
  images: string[];
}

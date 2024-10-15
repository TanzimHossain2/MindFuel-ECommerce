// prettier-ignore
import React from "react";

import "../../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";

// import ClientHeader from "@/components/layouts/ClientHeader";
import Context from "@/context/Context";
import ScrollTop from "@/components/common/ScrollTop";

// import AppModals from "@/components/layouts/AppModals";

import dynamic from "next/dynamic";
import { transformShopifyProduct } from "@/lib/transform";
import { getProducts } from "@/lib/product";
import { IProduct } from "@/types/product";

// Dynamically import AppModals and ensure it's client-side only
const AppModals = dynamic(() => import("@/components/layouts/AppModals"), {
  ssr: false,
});

const ClientHeader = dynamic(
  () => import("@/components/layouts/ClientHeader"),
  {
    ssr: false,
  }
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();
  const productList = products.products.map((product: any) =>
    transformShopifyProduct(product)
  ) as IProduct[];

  return (
    <html lang="en">
      <body className={`preload-wrapper popup-loader`}>
        <Context>
          <ClientHeader />
          <div id="wrapper">{children}</div>
          <AppModals products={productList} />
        </Context>
        <ScrollTop />
      </body>
    </html>
  );
}

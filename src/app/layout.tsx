"use client";
// prettier-ignore
import React from "react";
import "../../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";

import ClientHeader from "@/components/layouts/ClientHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`preload-wrapper popup-loader`}>
        <ClientHeader />
        <div id="wrapper">{children}</div>
      </body>
    </html>
  );
}

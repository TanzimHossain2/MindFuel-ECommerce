"use client";

import React, { useEffect } from "react";
import HomesModal from "@/components/modals/HomesModal";
import QuickView from "@/components/modals/QuickView";
import { usePathname } from "next/navigation";
import AskQuestion from "../modals/AskQuestion";
import BlogSidebar from "../modals/BlogSidebar";
import ColorCompare from "../modals/ColorCompare";
import Compare from "../modals/Compare";
import DeliveryReturn from "../modals/DeliveryReturn";
import FindSize from "../modals/FindSize";
import Login from "../modals/Login";
import MobileMenu from "../modals/MobileMenu";
import ProductSidebar from "../modals/ProductSidebar";
import QuickAdd from "../modals/QuickAdd";
import Register from "../modals/Register";
import ResetPass from "../modals/ResetPass";
import SearchModal from "../modals/SearchModal";
import ShareModal from "../modals/ShareModal";
import ShopCart from "../modals/ShopCart";
import ToolbarBottom from "../modals/ToolbarBottom";
import ToolbarShop from "../modals/ToolbarShop";
import { Modal, Offcanvas } from "bootstrap";
import { IProduct } from "@/types/product";

interface AppModalsProps {
  products: IProduct[];
}

export default function AppModals({ products }: AppModalsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const modalElements = document.querySelectorAll(".modal.show");
      modalElements.forEach((modal) => {
        const modalInstance = Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      });

      const offcanvasElements = document.querySelectorAll(".offcanvas.show");
      offcanvasElements.forEach((offcanvas) => {
        const offcanvasInstance = Offcanvas.getInstance(offcanvas);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      });
    }
  }, [pathname]);

  return (
    <>
      <HomesModal />
      <QuickView />
      <QuickAdd products={products} />
      <ProductSidebar />
      <Compare />
      <ShopCart />
      <AskQuestion />
      <BlogSidebar />
      <ColorCompare />
      <DeliveryReturn />
      <FindSize />
      <Login />
      <MobileMenu />
      <Register />
      <ResetPass />
      <SearchModal />
      <ToolbarBottom />
      <ToolbarShop />
      <ShareModal />
    </>
  );
}

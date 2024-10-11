"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import HomesModal from "@/components/modals/HomesModal";
import QuickView from "@/components/modals/QuickView";
import bootstrap from "bootstrap";

export default function ClientModals() {
  const pathname = usePathname();

  useEffect(() => {
    // Close any open modal and offcanvas on route change
    const modalElements = document.querySelectorAll(".modal.show");
    modalElements.forEach((modal) => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });

    const offcanvasElements = document.querySelectorAll(".offcanvas.show");
    offcanvasElements.forEach((offcanvas) => {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    });
  }, [pathname]);

  return (
    <>
      <HomesModal />
      <QuickView />
      {/* Render other modals */}
    </>
  );
}

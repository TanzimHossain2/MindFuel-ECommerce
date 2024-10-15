"use client";

import { useEffect } from "react";
import { Modal, Offcanvas } from "bootstrap";

export const OpenCartModal = () => {
  useEffect(() => {
    // Ensure the code only runs in the browser
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    // Close any open modals
    const modalElements =
      document.querySelectorAll<HTMLDivElement>(".modal.show");
    modalElements.forEach((modal) => {
      const modalInstance = Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });

    // Close any open offcanvas
    const offcanvasElements =
      document.querySelectorAll<HTMLDivElement>(".offcanvas.show");
    offcanvasElements.forEach((offcanvas) => {
      const offcanvasInstance = Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    });

    // Open the shopping cart modal
    const cartModalElement = document.getElementById(
      "shoppingCart"
    ) as HTMLDivElement | null;
    if (cartModalElement) {
      const myModal = new Modal(cartModalElement, {
        keyboard: false,
      });

      myModal.show();

      cartModalElement.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    }
  }, []);

  return null;
};

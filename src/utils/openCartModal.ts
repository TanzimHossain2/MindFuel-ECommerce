import bootstrap from "bootstrap";

export const openCartModal = () => {
  // Close any open modal
  const modalElements =
    document.querySelectorAll<HTMLDivElement>(".modal.show");
  modalElements.forEach((modal) => {
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  // Close any open offcanvas
  const offcanvasElements =
    document.querySelectorAll<HTMLDivElement>(".offcanvas.show");
  offcanvasElements.forEach((offcanvas) => {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
  });

  // Open the shopping cart modal
  const cartModalElement = document.getElementById(
    "shoppingCart"
  ) as HTMLDivElement | null;
  if (cartModalElement) {
    const myModal = new bootstrap.Modal(cartModalElement, {
      keyboard: false,
    });

    myModal.show();

    cartModalElement.addEventListener("hidden.bs.modal", () => {
      myModal.hide();
    });
  }
};

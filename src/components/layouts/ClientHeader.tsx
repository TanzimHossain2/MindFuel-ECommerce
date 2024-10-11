"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ClientHeader = () => {
  const pathname = usePathname();
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const lastScrollY = {
    current: (typeof window !== "undefined" ? window.scrollY : 0) as number,
  };

  // Load Bootstrap CSS on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/css/bootstrap.min.css");
    }
  }, []);

  // Load Bootstrap JS on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Bootstrap JS loaded
      });
    }
  }, []);

  // Handle scroll event to detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Close modals and offcanvas elements when the path changes
  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      const modalElements =
        document.querySelectorAll<HTMLElement>(".modal.show");
      modalElements.forEach((modal) => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      });

      const offcanvasElements =
        document.querySelectorAll<HTMLElement>(".offcanvas.show");
      offcanvasElements.forEach((offcanvas) => {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      });
    });
  }, [pathname]);

  // Adjust header position based on scroll direction
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("header");
    if (!header) {
      return;
    }

    header.style.top = scrollDirection === "up" ? "0px" : "-185px";
  }, [scrollDirection]);

  // Dynamically import WOW.js when the path changes
  useEffect(() => {
    import("wowjs").then(({ WOW }) => {
      const wow = new WOW({
        mobile: false,
        live: false,
      });
      wow.init();
    });
  }, [pathname]);

  return null; // This component doesn't render anything directly
};

export default ClientHeader;

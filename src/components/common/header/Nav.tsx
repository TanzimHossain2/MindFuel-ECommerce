"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  allPagesLinks,
  blogLinks,
  demoItems,
  productDetailPages,
  productsPages,
} from "@/data/menu";

// Define types for the menu items
type MenuItem = {
  href?: string;
  links?: MenuItem[];
};

type NavProps = {
  isArrow?: boolean;
  textColor?: string;
  Linkfs?: string;
};

const IsMenuActive = (menuItem: MenuItem[] | MenuItem): boolean => {
  const pathname = usePathname();

  let active = false;

  // Ensure menuItem is defined
  if (Array.isArray(menuItem)) {
    active = menuItem.some((item) => {
      const hrefPart = item.href?.split("/")[1];
      return hrefPart === pathname.split("/")[1];
    });

    // Iterate deeper into nested links
    menuItem.forEach((item) => {
      item.links?.forEach((link) => {
        const hrefPart = link.href?.split("/")[1];
        if (hrefPart === pathname.split("/")[1]) {
          active = true;
        }

        // Handle further nested links if they exist
        link.links?.forEach((subLink) => {
          const subHrefPart = subLink.href?.split("/")[1];
          if (subHrefPart === pathname.split("/")[1]) {
            active = true;
          }
        });
      });
    });
  } else {
    // Handle single object case
    const hrefPart = menuItem.href?.split("/")[1];
    if (hrefPart === pathname.split("/")[1]) {
      active = true;
    }
  }

  return active;
};

// Nav component
const Nav = ({ isArrow = true, textColor = "", Linkfs = "" }: NavProps) => {
  return (
    <>
      <li className="menu-item">
        <Link
          href="#"
          className={`item-link ${Linkfs} ${textColor} ${
            IsMenuActive(demoItems) ? "activeMenu" : ""
          }`}
        >
          Home
        </Link>
      </li>
      <li className="menu-item">
        <Link
          href="/shop"
          className={`item-link ${Linkfs} ${textColor} ${
            IsMenuActive(productsPages) ? "activeMenu" : ""
          }`}
        >
          Shop
        </Link>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor} ${
            IsMenuActive(productDetailPages) ? "activeMenu" : ""
          }`}
        >
          Products
          {isArrow && <i className="icon icon-arrow-down" />}
        </a>
      </li>
      <li className="menu-item position-relative">
        <Link
          href="/about"
          className={`item-link ${Linkfs} ${textColor} ${
            IsMenuActive(allPagesLinks) ? "activeMenu" : ""
          }`}
        >
          About
        </Link>
      </li>
      <li className="menu-item position-relative">
        <Link
          href="#"
          className={`item-link ${Linkfs} ${textColor} ${
            IsMenuActive(blogLinks) ? "activeMenu" : ""
          }`}
        >
          Blog
        </Link>
      </li>
    </>
  );
};

export default Nav;

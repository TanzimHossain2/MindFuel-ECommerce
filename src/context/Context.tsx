"use client";

import { allProducts } from "@/data/products";
import { openCartModal } from "@/utils/openCartModal";
import React, { useEffect, useContext, useState, ReactNode } from "react";

// Types for products, wishlist, cart, etc.
interface Product {
  id: number;
  title: string;
  price: number;
  imgSrc: string;
  imgHoverSrc?: string;
  // Add other properties as necessary
}

interface CartItem extends Product {
  quantity: number;
}

interface ContextType {
  cartProducts: CartItem[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalPrice: number;
  addProductToCart: (id: number, qty?: number) => void;
  isAddedToCartProducts: (id: number) => boolean;
  removeFromWishlist: (id: number) => void;
  addToWishlist: (id: number) => void;
  isAddedtoWishlist: (id: number) => boolean;
  quickViewItem: Product | null;
  wishList: number[];
  setQuickViewItem: React.Dispatch<React.SetStateAction<Product | null>>;
  quickAddItem: number;
  setQuickAddItem: React.Dispatch<React.SetStateAction<number>>;
  addToCompareItem: (id: number) => void;
  isAddedtoCompareItem: (id: number) => boolean;
  removeFromCompareItem: (id: number) => void;
  compareItem: number[];
  setCompareItem: React.Dispatch<React.SetStateAction<number[]>>;
}

const dataContext = React.createContext<ContextType | undefined>(undefined);

export const useContextElement = () => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useContextElement must be used within a ContextProvider");
  }
  return context;
};

interface ContextProps {
  children: ReactNode;
}

export default function Context({ children }: ContextProps) {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [wishList, setWishList] = useState<number[]>([]);
  const [compareItem, setCompareItem] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [quickViewItem, setQuickViewItem] = useState<Product | null>(
    allProducts[0]
  );
  const [quickAddItem, setQuickAddItem] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Calculate total price
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const addProductToCart = (id: number, qty: number = 1) => {
    if (!cartProducts.some((product) => product.id === id)) {
      const productToAdd = allProducts.find((product) => product.id === id);
      if (productToAdd) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const item: CartItem = { ...productToAdd, quantity: qty };
        setCartProducts((prev) => [...prev, item]);
        openCartModal();
      }
    }
  };

  const isAddedToCartProducts = (id: number) => {
    return cartProducts.some((product) => product.id === id);
  };

  const addToWishlist = (id: number) => {
    setWishList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removeFromWishlist = (id: number) => {
    setWishList((prev) => prev.filter((item) => item !== id));
  };

  const addToCompareItem = (id: number) => {
    if (!compareItem.includes(id)) {
      setCompareItem((prev) => [...prev, id]);
    }
  };

  const removeFromCompareItem = (id: number) => {
    setCompareItem((prev) => prev.filter((item) => item !== id));
  };

  const isAddedtoWishlist = (id: number) => {
    return wishList.includes(id);
  };

  const isAddedtoCompareItem = (id: number) => {
    return compareItem.includes(id);
  };

  // Local Storage handling
  useEffect(() => {
    const storedCart = JSON.parse(
      localStorage.getItem("cartList") || "[]"
    ) as CartItem[];
    if (storedCart.length) {
      setCartProducts(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const storedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    ) as number[];
    if (storedWishlist.length) {
      setWishList(storedWishlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextValue: ContextType = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
  };

  return (
    <dataContext.Provider value={contextValue}>{children}</dataContext.Provider>
  );
}

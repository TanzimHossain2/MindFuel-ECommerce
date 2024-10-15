"use client";

import { allProducts } from "@/data/products";
import dynamic from "next/dynamic";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { IProduct } from "../types/product/shopify";

const OpenCartModal = dynamic<{}>(
  () => import("@/utils/openCartModal").then((mod) => mod.OpenCartModal),
  { ssr: false }
);

interface CartItem extends IProduct {
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
  quickViewItem: IProduct | null;
  wishList: number[];
  setQuickViewItem: React.Dispatch<React.SetStateAction<IProduct | null>>;
  quickAddItem: number | null;
  setQuickAddItem: React.Dispatch<React.SetStateAction<number | null>>;
  addToCompareItem: (id: number) => void;
  isAddedtoCompareItem: (id: number) => boolean;
  removeFromCompareItem: (id: number) => void;
  compareItem: number[];
  setCompareItem: React.Dispatch<React.SetStateAction<number[]>>;
  quantityCount: number;
  setQuantityCount: React.Dispatch<React.SetStateAction<number>>;
  getProductQuantity: (productId: number | string) => number;
  setProductQuantity: (productId: number | string, newQuantity: number) => void;
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
  const [quickViewItem, setQuickViewItem] = useState<IProduct | null>(null);
  const [quickAddItem, setQuickAddItem] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [quantityCount, setQuantityCount] = useState<number>(1);
  const [productQuantities, setProductQuantities] = useState<{
    [id: number]: number;
  }>({});

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

        if (typeof window === "undefined" || typeof document === "undefined") {
          return;
        }
        <OpenCartModal />;
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

  // Get the quantity of a specific product by its ID
  const getProductQuantity = (productId: number | string) => {
    return productQuantities[productId as keyof typeof productQuantities] || 1;
  };

  // Set the quantity of a specific product
  const setProductQuantity = (
    productId: number | string,
    newQuantity: number
  ) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

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
    quantityCount,
    setQuantityCount,
    getProductQuantity,
    setProductQuantity,
  };

  return (
    <dataContext.Provider value={contextValue}>{children}</dataContext.Provider>
  );
}

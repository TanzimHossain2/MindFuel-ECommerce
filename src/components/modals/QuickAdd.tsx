"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { sizeOptions } from "@/data/singleProductOptions";
import { IProduct } from "@/types/product";
import Quantity from "../shared/product/Quantity";

interface IQuickAdd {
  products: IProduct[];
}

export default function QuickAdd({ products }: IQuickAdd) {
  const {
    quickAddItem,
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
    getProductQuantity,
  } = useContextElement();

  const [item, setItem] = useState(products[0]);

  useEffect(() => {
    if (quickAddItem) {
      const filtered = products.filter((el) => el.id == quickAddItem);
      if (filtered) {
        setItem(filtered[0]);
      }
    }
  }, [quickAddItem]);

  const [currentSize, setCurrentSize] = useState(sizeOptions[0]);

  const quantity = getProductQuantity(item.id);

  return (
    <div className="modal fade modalDemo" id="quick_add">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-product-info-item">
              <div className="image">
                <Image
                  alt=""
                  style={{ objectFit: "contain" }}
                  src={item?.imgSrc || ""}
                  width={720}
                  height={1005}
                />
              </div>
              <div className="content">
                <Link href={`/product-detail/${item?.id}`}>{item?.title}</Link>
                <div className="tf-product-info-price">
                  <div className="price">${item?.price.toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div className="tf-product-info-variant-picker mb_15">
              <div className="variant-picker-item">
                <div className="variant-picker-label">
                  Size:{" "}
                  <span className="fw-6 variant-picker-label-value">
                    {" "}
                    {currentSize.value}
                  </span>
                </div>
                <form className="variant-picker-values">
                  {sizeOptions.map((size) => (
                    <React.Fragment key={size.id}>
                      <input
                        type="radio"
                        name="size1"
                        readOnly
                        checked={currentSize == size}
                      />
                      <label
                        onClick={() => setCurrentSize(size)}
                        className="style-text"
                        data-value={size.value}
                      >
                        <p>{size.value}</p>
                      </label>
                    </React.Fragment>
                  ))}
                </form>
              </div>
            </div>

            <div className="tf-product-info-quantity mb_15">
              <div className="quantity-title fw-6">Quantity</div>
              <Quantity productId={item.id} key={item.id} />
            </div>

            <div className="tf-product-info-buy-button">
              <form onSubmit={(e) => e.preventDefault()} className="">
                <a
                  className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                  onClick={() => addProductToCart(item.id)}
                >
                  <span>
                    {isAddedToCartProducts(item.id)
                      ? "Already Added - "
                      : "Add to cart - "}
                  </span>
                  <span className="tf-qty-price">
                    ${(item.price * quantity).toFixed(2)}
                  </span>
                </a>
                <div className="tf-product-btn-wishlist btn-icon-action">
                  <i className="icon-heart" />
                  <i className="icon-delete" />
                </div>
                <a
                  href="#compare"
                  data-bs-toggle="offcanvas"
                  aria-controls="offcanvasLeft"
                  onClick={() => addToCompareItem(item.id)}
                  className="tf-product-btn-wishlist box-icon bg_white compare btn-icon-action"
                >
                  <span className="icon icon-compare" />
                  <span className="icon icon-check" />
                </a>
                <div className="w-100">
                  <a href="#" className="btns-full">
                    Buy with
                    <Image
                      alt=""
                      src="/images/payments/paypal.png"
                      width={64}
                      height={18}
                    />
                  </a>
                  <a href="#" className="payment-more-option">
                    More payment options
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

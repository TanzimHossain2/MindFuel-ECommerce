"use client";
import { useContextElement } from "@/context/Context";

interface IQuantity {
  productId: number | string;
}

export default function Quantity({ productId }: IQuantity) {
  const { setQuantityCount, quantityCount } = useContextElement();

  return (
    <div className="wg-quantity">
      <span
        className="btn-quantity minus-btn"
        onClick={() => setQuantityCount((pre) => (pre == 1 ? 1 : pre - 1))}
      >
        -
      </span>
      <input
        min={1}
        type="text"
        onChange={(e) => setQuantityCount(e.target.value / 1)}
        name="number"
        value={quantityCount}
      />
      <span
        className="btn-quantity plus-btn"
        onClick={() => setQuantityCount((pre) => pre + 1)}
      >
        +
      </span>
    </div>
  );
}

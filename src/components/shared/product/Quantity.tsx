import { useContextElement } from "@/context/Context";

interface IQuantity {
  productId: number | string;
}

export default function Quantity({ productId }: IQuantity) {
  const { setProductQuantity, getProductQuantity } = useContextElement();

  const quantity = getProductQuantity(productId);

  return (
    <div className="wg-quantity">
      <span
        className="btn-quantity minus-btn"
        onClick={() =>
          setProductQuantity(productId, quantity === 1 ? 1 : quantity - 1)
        }
      >
        -
      </span>
      <input
        min={1}
        type="text"
        onChange={(e) => setProductQuantity(productId, Number(e.target.value))}
        name="number"
        value={quantity}
      />
      <span
        className="btn-quantity plus-btn"
        onClick={() => setProductQuantity(productId, quantity + 1)}
      >
        +
      </span>
    </div>
  );
}

import { ProductCard } from "@/components/shared/product/ProductCard";
import { IProduct } from "@/types/product";

interface IProductGrid {
  gridItems?: number;
  allProducts: IProduct[];
}

export default function ProductGrid({
  gridItems = 4,
  allProducts,
}: IProductGrid) {
  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0  auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {allProducts.length} product(s) found
      </div>
      <div className="grid-layout wrapper-shop" data-grid={`grid-${gridItems}`}>
        {allProducts.map((elm, i) => (
          <ProductCard product={elm} key={i} />
        ))}
      </div>
    </>
  );
}

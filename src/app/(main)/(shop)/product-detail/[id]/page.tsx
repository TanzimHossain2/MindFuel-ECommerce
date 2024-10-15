import GlobalHeader from "@/components/common/header/GlobalHeader";
import { allProducts } from "@/data/products";
import { getProductById } from "@/lib/product";
import { transformProductDetails } from "@/lib/transform";
import { notFound } from "next/navigation";
import BreadCamp from "./_components/Breadcamp";
import DetailsOuterZoom from "./_components/DetailsOuterZoom";
import Products from "./_components/Product";
import RecentProducts from "./_components/RecentProducts";
import ShopDetailsTab from "./_components/ShopDetailsTab";

const productDetailsPage = async ({ params }: any) => {
  const paramsId = params.id;
  const id = paramsId.split("-").pop();

  const productData = await getProductById(id);

  if (!productData || !productData.product) {
    notFound();
  }

  const product = transformProductDetails(productData.product);

  return (
    <div>
      <GlobalHeader />
      <BreadCamp product={product} />
      <DetailsOuterZoom product={product} />
      <ShopDetailsTab />
      <Products />
      <RecentProducts />
    </div>
  );
};

export default productDetailsPage;

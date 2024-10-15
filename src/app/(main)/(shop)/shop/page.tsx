import GlobalHeader from "@/components/common/header/GlobalHeader";
import TopBar from "@/components/common/header/TopBar";
import ShopSidebar from "./_components/ShopSidebar";
import { getProducts } from "@/lib/product";
import { transformShopifyProduct } from "@/lib/transform";
export const metadata = {
  title: "Shop  || MindFuel BD",
  description:
    "Stay healthy and happy with our wide range of health and wellness products. Shop now and get the best deals on health and wellness products.",
};

const ShopPage = async () => {
  const products = await getProducts();
  const productList = products.products.map((product: any) =>
    transformShopifyProduct(product)
  );
  console.log(productList.length);

  return (
    <>
      <TopBar />
      <GlobalHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">New Arrival</div>
              <p className="text-center text-2 text_black-2 mt_5">
                Shop through our latest selection of Fashion
              </p>
            </div>
          </div>
        </div>
      </div>

      <ShopSidebar products={productList} />
    </>
  );
};

export default ShopPage;

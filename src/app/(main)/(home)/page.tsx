import Header from "@/components/common/header/Header";
import TopBar from "@/components/common/header/TopBar";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Features from "./_components/Features";
import Collections from "./_components/Collections";
import Products from "./_components/Products";
import Banner from "./_components/Banner";
import CollectionsBanner from "./_components/CollectionsBanner";
import Testimonials from "./_components/Testimonials";
import ShopGram from "./_components/ShopGram";

export default function Home() {
  console.log("Home");

  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Marquee />
      <Features />
      <Collections />
      <Products />
      <Banner />
      <CollectionsBanner />
      <Products />
      <Testimonials />
      <ShopGram />
    </>
  );
}

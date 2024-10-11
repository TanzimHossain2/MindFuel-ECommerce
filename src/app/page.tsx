import Header from "@/components/common/header/Header";
import TopBar from "@/components/common/header/TopBar";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";

export default function Home() {
  console.log("Home");

  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Marquee />
    </>
  );
}

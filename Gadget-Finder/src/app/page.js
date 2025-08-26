"use client";
import HeroSlider from "./Hero/page";
import About from "./component/About";
import Footer from "./component/Footer";
import FeaturedProducts from "./component/FeaturedProducts";

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <section>
        <HeroSlider></HeroSlider>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* About Section */}
      <About />

      {/* Footer Section */}
      <Footer></Footer>
    </div>
  );
}

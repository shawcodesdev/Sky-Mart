import React from "react";
import Banner from "../components/Banner";
import FeaturesSection from "../components/FeaturesSection";
import Statistics from "../components/Statistics";
import ShopByCategory from "../components/ShopByCategory";
import FeaturedProductSections from "../components/FeaturedProductSections";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-8 flex flex-col gap-6">
      <Banner />
      <Statistics />
      <ShopByCategory />
      <FeaturedProductSections />
      <FeaturesSection />
    </main>
  );
};

export default Home;

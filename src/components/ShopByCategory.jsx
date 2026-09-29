import React, { useContext } from "react";
import { useNavigate } from "react-router";
import {
  Sparkles,
  Shirt,
  Armchair,
  Apple,
  ArrowRight,
  Home,
  SprayCan,
} from "lucide-react";
import CategoryCard from "./CategoryCard";
import { MyStoreContext } from "../context/ShopContext";

const ShopByCategory = ({ onCategoryClick }) => {
  const navigate = useNavigate();
  const { products, setCategory } = useContext(MyStoreContext);

  const handleCategoryClick = (cat) => {
    if (onCategoryClick) {
      onCategoryClick(cat);
    } else {
      setCategory(cat.id);
      navigate("/shop");
    }
  };

  const handleViewAll = () => {
    setCategory("all");
    navigate("/shop");
  };

  const defaultCategories = [
    {
      id: "beauty",
      name: "Beauty",
      itemCount: `${products.filter((p) => p.category === "beauty").length} items`,
      icon: Sparkles,
    },
    {
      id: "clothing",
      name: "Clothing",
      itemCount: `${products.filter((p) => p.category === "clothing").length} items`,
      icon: Shirt,
    },
    {
      id: "furniture",
      name: "Furniture",
      itemCount: `${products.filter((p) => p.category === "furniture").length} items`,
      icon: Armchair,
    },
    {
      id: "home-kitchen",
      name: "Home & Kitchen",
      itemCount: `${products.filter((p) => p.category === "home-kitchen").length} items`,
      icon: Home,
    },
    {
      id: "fragrances",
      name: "Fragrances",
      itemCount: `${products.filter((p) => p.category === "fragrances").length} items`,
      icon: SprayCan,
    },
    {
      id: "groceries",
      name: "Groceries",
      itemCount: `${products.filter((p) => p.category === "groceries").length} items`,
      icon: Apple,
    },
  ];

  const displayCategories = defaultCategories;

  return (
    <section className="w-full flex flex-col gap-4 sm:gap-5 mt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-txt tracking-tight">
          Shop by Category
        </h2>

        <div
          onClick={handleViewAll}
          className="inline-flex items-center gap-1 text-sm font-medium text-volt hover:text-volt-light transition-colors group cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight
            size={15}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {displayCategories.map((category) => (
          <CategoryCard
            key={category.id || category.name}
            icon={category.icon}
            name={category.name}
            itemCount={category.itemCount}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;

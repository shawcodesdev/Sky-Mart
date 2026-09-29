import { useContext } from "react";
import { Package, TrendingUp, Star, Tag } from "lucide-react";
import StatisticCard from "./StatisticCard";
import { MyStoreContext } from "../context/ShopContext";

const Statistics = ({ stats }) => {
  const {
    products = [],
    cart = [],
    cartTotal = 0,
  } = useContext(MyStoreContext) || {};

  const defaultStats = [
    {
      id: "cart-items",
      icon: Package,
      value: cart.length,
      title: "Cart Items",
      subtitle: "In your bag",
      color: "violet",
    },
    {
      id: "cart-value",
      icon: TrendingUp,
      value: `$${cartTotal.toFixed(2)}`,
      title: "Cart Value",
      subtitle: "Ready to checkout",
      color: "blue",
    },
    {
      id: "top-products",
      icon: Star,
      value:
        products.filter((p) => (p.rating?.rate || p.rating) > 4.5).length ||
        "error",
      title: "Top Products",
      subtitle: "Highly rated",
      color: "amber",
    },
    {
      id: "categories",
      icon: Tag,
      value: new Set(products.map((p) => p.category)).size || "error",
      title: "Categories",
      subtitle: "To explore",
      color: "cyan",
    },
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
      {displayStats.map((stat) => (
        <StatisticCard
          key={stat.id || stat.title}
          icon={stat.icon}
          value={stat.value}
          title={stat.title}
          subtitle={stat.subtitle}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default Statistics;

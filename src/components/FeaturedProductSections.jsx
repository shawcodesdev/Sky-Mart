import { useContext } from "react";
import ProductSection from "./ProductSection";
import { MyStoreContext } from "../context/ShopContext";

const FeaturedProductSections = ({ onAddToCart }) => {
  const { products, addToCart } = useContext(MyStoreContext);
  const topRatedProducts = [...products]
    .filter((product) => product.rating > 4.5)
    .slice(0, 5);
  const premiumProducts = [...products]
    .sort(
      (firstProduct, secondProduct) => secondProduct.price - firstProduct.price,
    )
    .slice(0, 5);

  const handleAddToCart = (p) => {
    if (onAddToCart) {
      onAddToCart(p);
    } else if (addToCart) {
      addToCart(p, 1);
    }
  };

  return (
    <div className='w-full flex flex-col gap-6 mt-2'>
      {/* Top Rate Section */}
      <ProductSection
        title='Top Rate'
        products={topRatedProducts}
        onAddToCart={handleAddToCart}
      />
      {/* Premium Products Section */}
      <ProductSection
        title='Premium Products'
        products={premiumProducts}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default FeaturedProductSections;

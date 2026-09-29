import { useNavigate } from "react-router";
import { Star, ArrowRight } from "lucide-react";
import ProductListItem from "./ProductListItem";

const ProductSection = ({ title, products, onAddToCart }) => {
  let navigate = useNavigate();
  return (
    <div className='w-full rounded-3xl border border-white/10 bg-ink p-5 sm:p-6 flex flex-col gap-4 font-body'>
      {/* Section Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Star size={18} className='text-volt fill-volt' />
          <h3 className='font-heading text-lg sm:text-xl font-bold text-txt tracking-tight'>
            {title}
          </h3>
        </div>

        <div
          onClick={() => navigate("/shop")}
          className='inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-volt hover:text-volt-light transition-colors group'>
          <span>See all</span>
          <ArrowRight
            size={14}
            className='group-hover:translate-x-0.5 transition-transform'
          />
        </div>
      </div>

      {/* Product List Rows */}
      <div className='flex flex-col gap-2.5'>
        {products.map((p) => (
          <ProductListItem
            key={p.id}
            image={p.thumbnail || p.images?.[0]}
            name={p.title}
            price={`$${p.price}`}
            onClick={() => navigate(`/product/${p.id}`)}
            onAddToCart={() => onAddToCart && onAddToCart(p)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;

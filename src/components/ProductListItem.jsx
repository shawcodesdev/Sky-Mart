import { ShoppingBag } from "lucide-react";
const ProductListItem = ({ image, name, price, onAddToCart, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='group flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-volt-light/[0.06] hover:border-volt p-3 sm:p-4 transition-all duration-200'>
      {/* Left: Thumbnail & Info */}
      <div className='flex items-center gap-3 sm:gap-4 min-w-0'>
        {/* Product Image */}
        <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0'>
          {image ? (
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300'
              loading='lazy'
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className='w-full h-full bg-white/5 flex items-center justify-center text-txt/30 text-xs'>
              Img
            </div>
          )}
        </div>

        {/* Title & Price */}
        <div className='flex flex-col min-w-0'>
          <h4 className='font-body text-xs sm:text-sm font-medium text-txt/90 truncate group-hover:text-txt transition-colors'>
            {name}
          </h4>
          <span className='font-heading font-bold text-sm sm:text-base text-volt mt-0.5 tracking-tight'>
            {price}
          </span>
        </div>
      </div>

      {/* Right: Add to Cart Button */}
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          if (onAddToCart) onAddToCart();
        }}
        title='Add to cart'
        className='w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-volt/10 border border-volt/20 text-volt hover:bg-volt hover:text-ink active:scale-95 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer shadow-sm shadow-volt/5'>
        <ShoppingBag size={17} strokeWidth={2} />
      </button>
    </div>
  );
};

export default ProductListItem;

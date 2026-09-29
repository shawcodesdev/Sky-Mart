import React, { useContext, useState } from "react";
import { Star, Check, Tag, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStoreContext } from "../context/ShopContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(MyStoreContext) || {};
  const [justAdded, setJustAdded] = useState(false);
  const { id, category, thumbnail, images, title, reviews, price, rating } =
    product;

  const displayImage = thumbnail || images?.[0] || "";
  const displayRating =
    typeof rating === "number" ? rating.toFixed(1) : rating || "0.0";
  const reviewCount = Array.isArray(reviews) ? reviews.length : 0;

  return (
    <div
      onClick={() => id && navigate(`/product/${id}`)}
      className="w-full h-full overflow-hidden rounded-2xl border border-zinc-800 bg-[#111111] shadow-sm flex flex-col justify-between cursor-pointer group hover:border-volt/40 hover:shadow-lg hover:shadow-volt/5 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative bg-white p-5 flex items-center justify-center overflow-hidden">
        {/* Category */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-zinc-600 px-2.5 py-1 text-xs font-medium text-white capitalize">
          <Tag size={12} />
          {category}
        </div>

        <img
          src={displayImage}
          alt={title}
          className="h-[180px] w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col justify-between flex-1">
        {/* Product title */}
        <h2 className="min-h-[48px] text-base font-bold leading-6 text-white line-clamp-2 group-hover:text-volt-light transition-colors">
          {title}
        </h2>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex gap-0.5 text-yellow-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>

          <span className="text-xs text-zinc-400">
            {displayRating} ({reviewCount})
          </span>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-zinc-700" />

        {/* Price + Cart */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-volt-light">${price}</span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (addToCart) addToCart(product, 1);
              setJustAdded(true);
              setTimeout(() => setJustAdded(false), 1200);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer active:scale-95 ${
              justAdded
                ? "bg-green-500 text-black border border-green-500"
                : "border border-volt-light text-volt hover:bg-volt hover:text-ink"
            }`}
          >
            {justAdded ? (
              <>
                <Check size={13} strokeWidth={2.5} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Tag,
  Check,
  Share2,
} from "lucide-react";
import { MyStoreContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(MyStoreContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Target product ID (fallback to 1 if not specified)
  const currentId = id ? Number(id) : products[0]?.id || 1;

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentId]);

  // Fetch or find product
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const foundInContext = products.find((p) => p.id === currentId);
    if (foundInContext) {
      setProduct(foundInContext);
      setSelectedImage(
        foundInContext.thumbnail || foundInContext.images?.[0] || "",
      );
      setLoading(false);
    } else {
      // Fetch directly from API if context doesn't have it or direct load
      axios
        .get(`https://dummyjson.com/products/${currentId}`)
        .then((res) => {
          if (isMounted) {
            setProduct(res.data);
            setSelectedImage(res.data.thumbnail || res.data.images?.[0] || "");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error loading product:", err);
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [currentId, products]);

  // Calculate Next and Prev products
  const { prevProduct, nextProduct } = useMemo(() => {
    if (!products || products.length === 0)
      return { prevProduct: null, nextProduct: null };
    const currentIndex = products.findIndex((p) => p.id === currentId);
    if (currentIndex === -1) return { prevProduct: null, nextProduct: null };

    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    const nextIndex = (currentIndex + 1) % products.length;

    return {
      prevProduct: products[prevIndex],
      nextProduct: products[nextIndex],
    };
  }, [products, currentId]);

  // Related products (same category or others, excluding current)
  const relatedProducts = useMemo(() => {
    if (!product || !products || products.length === 0) return [];
    const sameCategory = products.filter(
      (p) => p.id !== product.id && p.category === product.category,
    );
    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }
    // Fill up with other products if needed
    const otherProducts = products.filter(
      (p) => p.id !== product.id && p.category !== product.category,
    );
    return [...sameCategory, ...otherProducts].slice(0, 4);
  }, [product, products]);

  const handleAddToCart = () => {
    if (product && addToCart) {
      addToCart(product, 1);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatCategory = (val) =>
    val
      ? val
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "";

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-volt/20 border-t-volt rounded-full animate-spin" />
        <p className="text-sm text-zinc-400 font-body">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold font-heading text-txt">
          Product Not Found
        </h2>
        <p className="text-zinc-400 max-w-md text-sm font-body">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-volt text-ink font-semibold hover:bg-volt-light transition"
        >
          <ArrowLeft size={16} /> Back to Shop
        </Link>
      </div>
    );
  }

  const displayRating =
    typeof product.rating === "number"
      ? product.rating.toFixed(1)
      : product.rating || "4.7";
  const reviewCount = Array.isArray(product.reviews)
    ? product.reviews.length * 90 + 45
    : 450;

  // Strikethrough original price if discount exists
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10 font-body text-txt">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 flex-wrap"
      >
        <button
          onClick={() => navigate("/shop")}
          className="inline-flex items-center gap-1.5 hover:text-white transition cursor-pointer text-zinc-400 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Products</span>
        </button>
        <span className="text-zinc-600">/</span>
        <button
          onClick={() => navigate("/shop")}
          className="hover:text-white transition cursor-pointer capitalize text-zinc-400"
        >
          {formatCategory(product.category)}
        </button>
        <span className="text-zinc-600">/</span>
        <span className="text-txt truncate max-w-xs font-medium">
          {product.title}
        </span>
      </nav>

      {/* Main Product Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Main White Canvas Container */}
          <div className="relative w-full aspect-square bg-white rounded-3xl p-8 sm:p-12 flex items-center justify-center shadow-2xl border border-white/10 overflow-hidden group">
            {/* Discount Badge if available */}
            {product.discountPercentage && (
              <div className="absolute top-5 left-5 z-10 bg-volt text-ink font-heading text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {Math.round(product.discountPercentage)}% OFF
              </div>
            )}

            {/* Share Button on Canvas */}
            <button
              onClick={handleShare}
              title="Share product"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-zinc-700 flex items-center justify-center transition cursor-pointer"
            >
              {copiedLink ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Share2 size={16} />
              )}
            </button>

            {/* Main Image */}
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 select-none"
            />
          </div>

          {/* Optional Thumbnail Strip (if multiple images exist) */}
          {Array.isArray(product.images) && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shrink-0 border-2 transition-all cursor-pointer overflow-hidden ${
                    selectedImage === imgUrl
                      ? "border-volt shadow-lg shadow-volt/20 scale-102"
                      : "border-white/10 hover:border-volt/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.title} angle ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-1.5 w-fit rounded-full border border-volt/30 bg-volt/10 px-3.5 py-1 text-xs font-medium text-volt-light tracking-wide">
            <Tag size={13} className="text-volt" />
            <span className="capitalize font-medium">
              {formatCategory(product.category)}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-heading text-txt tracking-tight mt-3 mb-2 leading-tight">
            {product.title}
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2.5 my-2">
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={17}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="font-heading text-sm font-bold text-txt">
              {displayRating}
            </span>
            <span className="text-xs sm:text-sm text-zinc-400">
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Divider Line */}
          <div className="h-px bg-white/10 my-4" />

          {/* Price Section */}
          <div className="flex items-baseline gap-3 my-1">
            <span className="text-4xl sm:text-5xl font-bold font-heading text-volt tracking-tight">
              ${product.price}
            </span>
            {originalPrice && (
              <span className="text-lg text-zinc-500 line-through font-body">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Divider Line */}
          <div className="h-px bg-white/10 my-4" />

          {/* Description */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-body mb-6">
            {product.description ||
              "Latest model with stunning OLED display, premium build quality, fast performance, and long battery life. Perfect for productivity, creative work, and entertainment."}
          </p>

          {/* Action Row: Add to Cart & Wishlist */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                handleAddToCart();
              }}
              className={`flex-1 py-4 px-6 rounded-2xl font-heading font-semibold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg ${
                addedToCart
                  ? "bg-green-500 text-black shadow-green-500/20"
                  : "bg-volt hover:bg-volt-light text-ink shadow-volt/25"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check size={20} strokeWidth={2.5} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={20} className="fill-ink text-ink" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isWishlisted
                  ? "border-volt/50 bg-volt/15 text-volt"
                  : "border-white/10 bg-white/5 hover:border-volt/30 hover:bg-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <Heart
                size={20}
                className={isWishlisted ? "fill-volt text-volt" : ""}
              />
            </button>
          </div>

          {/* 3 Value Proposition Cards (Free Delivery, Secure Pay, Easy Returns) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 my-6">
            {/* Free Delivery */}
            <div className="flex flex-col items-center text-center p-3 sm:p-3.5 rounded-2xl border border-white/10 bg-[#121212] transition-colors hover:border-white/20">
              <div className="mb-1.5 text-volt">
                <Truck size={20} />
              </div>
              <span className="text-xs font-semibold text-txt">
                Free Delivery
              </span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                On orders $50+
              </span>
            </div>

            {/* Secure Pay */}
            <div className="flex flex-col items-center text-center p-3 sm:p-3.5 rounded-2xl border border-white/10 bg-[#121212] transition-colors hover:border-white/20">
              <div className="mb-1.5 text-volt">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-semibold text-txt">Secure Pay</span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                256-bit SSL
              </span>
            </div>

            {/* Easy Returns */}
            <div className="flex flex-col items-center text-center p-3 sm:p-3.5 rounded-2xl border border-white/10 bg-[#121212] transition-colors hover:border-white/20">
              <div className="mb-1.5 text-volt">
                <RotateCcw size={20} />
              </div>
              <span className="text-xs font-semibold text-txt">
                Easy Returns
              </span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                30-day policy
              </span>
            </div>
          </div>

          {/* Next Button / Catalog Navigation (matching reference design) */}
          {nextProduct && (
            <div className="flex items-center gap-3 w-full">
              {prevProduct && (
                <button
                  type="button"
                  onClick={() => navigate(`/product/${prevProduct.id}`)}
                  title={`Previous: ${prevProduct.title}`}
                  className="py-3.5 px-4 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 text-zinc-300 font-heading text-sm font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Prev</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate(`/product/${nextProduct.id}`)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-volt hover:bg-volt-light text-ink font-heading text-sm sm:text-base font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-volt/15 cursor-pointer active:scale-[0.98]"
              >
                <span>Next</span>
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-6 border-t border-white/10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-txt tracking-tight">
              Related Products
            </h2>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-medium text-volt hover:text-volt-light inline-flex items-center gap-1 transition"
            >
              <span>View all</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDescription;

import React, { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Tag,
  CheckCircle2,
  Lock,
  X,
  CreditCard,
} from "lucide-react";
import { MyStoreContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

const FREE_SHIPPING_THRESHOLD = 50;

const Cart = () => {
  const navigate = useNavigate();
  const {
    products = [],
    cart = [],
    cartTotal = 0,
    cartItemCount = 0,
    subtotal = 0,
    discountAmount = 0,
    discountedSubtotal = 0,
    shippingCost = 0,
    isFreeShipping = true,
    estimatedTax = 0,
    appliedDiscount = 0,
    setAppliedDiscount,
    discountCodeName = "",
    setDiscountCodeName,
    FREE_SHIPPING_THRESHOLD = 50,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToCart,
  } = useContext(MyStoreContext) || {};

  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Totals calculations aligned with context
  const totalItemCount = cartItemCount;
  const total = cartTotal;

  const shippingProgress = Math.min(
    100,
    Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - discountedSubtotal
  ).toFixed(2);

  // Apply Coupon
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const cleaned = promoCode.trim().toUpperCase();

    if (!cleaned) return;

    if (cleaned === "SKY20") {
      setAppliedDiscount(20);
      setDiscountCodeName("SKY20 (20% OFF)");
      setPromoCode("");
    } else if (cleaned === "SAVE10") {
      setAppliedDiscount(10);
      setDiscountCodeName("SAVE10 (10% OFF)");
      setPromoCode("");
    } else {
      setPromoError("Invalid code. Try SKY20 or SAVE10!");
    }
  };

  const handleRemovePromo = () => {
    setAppliedDiscount(0);
    setDiscountCodeName("");
    setPromoError("");
  };

  // Quick helper to populate demo cart if user has empty cart
  const handleAddSampleItems = () => {
    if (products.length > 0) {
      products.slice(0, 3).forEach((prod) => {
        addToCart(prod, 1);
      });
    }
  };

  // Handle checkout simulation
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  // Recommended products (first 4 products not currently in cart)
  const recommendedProducts = useMemo(() => {
    const inCartIds = new Set(cart.map((item) => item.id));
    return products.filter((p) => !inCartIds.has(p.id)).slice(0, 4);
  }, [products, cart]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10 font-body text-txt">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400"
      >
        <Link to="/" className="hover:text-white transition">
          Home
        </Link>
        <span className="text-zinc-600">/</span>
        <Link to="/shop" className="hover:text-white transition">
          Shop
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-txt font-medium">Cart</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-txt tracking-tight flex items-center gap-3">
            Shopping Cart
            {cart.length > 0 && (
              <span className="text-sm sm:text-base font-normal text-volt bg-volt/10 border border-volt/20 px-3 py-0.5 rounded-full font-body">
                {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
              </span>
            )}
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-1">
            Review your selected items and complete your purchase.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-red-400 transition cursor-pointer self-start sm:self-auto py-1"
          >
            <Trash2 size={15} />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="w-full rounded-3xl border border-white/10 bg-[#121212] p-8 sm:p-16 flex flex-col items-center justify-center text-center gap-6">
          <div className="relative w-24 h-24 rounded-full bg-volt/10 border border-volt/20 flex items-center justify-center shadow-lg shadow-volt/5">
            <ShoppingBag size={42} className="text-volt" strokeWidth={1.8} />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-volt flex items-center justify-center text-ink text-xs font-bold font-heading">
              0
            </div>
          </div>

          <div className="max-w-md flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-txt">
              Your cart is currently empty
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Looks like you haven't added anything to your cart yet. Discover trending
              deals and premium products in our shop!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-volt hover:bg-volt-light text-ink font-semibold font-heading transition active:scale-95 shadow-lg shadow-volt/20"
            >
              <span>Explore Shop</span>
              <ArrowRight size={18} />
            </Link>

            {products.length > 0 && (
              <button
                onClick={handleAddSampleItems}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-txt text-sm font-medium transition cursor-pointer"
              >
                <Sparkles size={16} className="text-volt" />
                <span>Add Sample Items</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Populated Cart Grid: 2 Columns */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Free Shipping Progress Card */}
            <div className="rounded-2xl border border-white/10 bg-[#121212] p-4 sm:p-5 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                <span className="flex items-center gap-2 text-txt">
                  <Truck size={17} className="text-volt shrink-0" />
                  {isFreeShipping ? (
                    <span className="text-green-400 font-semibold">
                      Congratulations! You unlocked FREE Express Shipping!
                    </span>
                  ) : (
                    <span>
                      Add{" "}
                      <strong className="text-volt">
                        ${amountNeededForFreeShipping}
                      </strong>{" "}
                      more to qualify for{" "}
                      <strong className="text-white">FREE Express Shipping</strong>
                    </span>
                  )}
                </span>
                <span className="text-zinc-400">{shippingProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-volt to-volt-light transition-all duration-500 rounded-full"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Container */}
            <div className="rounded-3xl border border-white/10 bg-[#121212] divide-y divide-white/5 overflow-hidden">
              {cart.map((item) => {
                const itemTotalPrice = (item.price * (item.quantity || 1)).toFixed(2);
                const itemImage = item.thumbnail || item.images?.[0] || "";

                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Item Image + Details */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Product Thumbnail in White Card */}
                      <Link
                        to={`/product/${item.id}`}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2 shrink-0 flex items-center justify-center overflow-hidden border border-white/10 group cursor-pointer"
                      >
                        <img
                          src={itemImage}
                          alt={item.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <span className="inline-flex items-center gap-1 w-fit rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] font-medium text-zinc-400 capitalize">
                          <Tag size={10} className="text-volt" />
                          {item.category || "General"}
                        </span>

                        <Link
                          to={`/product/${item.id}`}
                          className="font-heading font-semibold text-sm sm:text-base text-txt hover:text-volt transition-colors line-clamp-1 truncate"
                        >
                          {item.title}
                        </Link>

                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span>Unit Price:</span>
                          <span className="text-white font-medium">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price Row */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      {/* Stepper */}
                      <div className="flex items-center border border-white/10 bg-[#1a1a1a] rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          type="button"
                          title="Decrease quantity"
                          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer active:scale-90"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-9 text-center text-xs sm:text-sm font-semibold font-heading text-txt">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          type="button"
                          title="Increase quantity"
                          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <div className="text-right min-w-[75px]">
                        <span className="font-heading font-bold text-base sm:text-lg text-volt">
                          ${itemTotalPrice}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        type="button"
                        title="Remove item from cart"
                        className="w-9 h-9 rounded-xl border border-white/5 bg-white/5 text-zinc-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 flex items-center justify-center transition cursor-pointer active:scale-90 shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back to Shop & Assurance */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Continue Shopping</span>
              </Link>

              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-volt" />
                  <span>Buyer Protection</span>
                </span>
                <span className="text-zinc-700">•</span>
                <span className="flex items-center gap-1.5">
                  <RotateCcw size={15} className="text-volt" />
                  <span>30-Day Free Returns</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            <div className="rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-7 flex flex-col gap-6 shadow-xl">
              {/* Card Header */}
              <h2 className="text-xl font-bold font-heading text-txt tracking-tight pb-3 border-b border-white/10">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex flex-col gap-2">
                <label className="text-xs font-medium text-zinc-400">
                  Promo / Coupon Code
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. SKY20"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-txt placeholder-zinc-500 uppercase tracking-wider outline-none focus:border-volt/50 transition"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-txt text-xs font-semibold font-heading transition cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>

                {/* Promo hints */}
                {!appliedDiscount && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-zinc-500">Try:</span>
                    <button
                      type="button"
                      onClick={() => setPromoCode("SKY20")}
                      className="text-[11px] text-volt hover:underline cursor-pointer"
                    >
                      SKY20 (-20%)
                    </button>
                    <span className="text-zinc-600">|</span>
                    <button
                      type="button"
                      onClick={() => setPromoCode("SAVE10")}
                      className="text-[11px] text-volt hover:underline cursor-pointer"
                    >
                      SAVE10 (-10%)
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-xs text-red-400 mt-0.5">{promoError}</p>
                )}

                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl px-3 py-2 mt-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 size={14} />
                      {discountCodeName}
                    </span>
                    <button
                      onClick={handleRemovePromo}
                      type="button"
                      title="Remove coupon"
                      className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-3 text-sm border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Subtotal ({totalItemCount} items)</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between text-green-400">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1">
                    <span>Estimated Shipping</span>
                  </span>
                  <span className="font-medium text-white">
                    {isFreeShipping ? (
                      <span className="text-volt font-semibold">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-white font-medium">${estimatedTax.toFixed(2)}</span>
                </div>

                {/* Grand Total */}
                <div className="border-t border-white/10 pt-4 mt-1 flex items-baseline justify-between">
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-base text-txt">
                      Total
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Including taxes & shipping
                    </span>
                  </div>
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-volt tracking-tight">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 px-6 rounded-2xl bg-volt hover:bg-volt-light text-ink font-heading font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-volt/25 transition duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Proceed to Checkout</span>
                  </>
                )}
              </button>

              {/* Security & Payment Icons */}
              <div className="flex flex-col items-center gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Lock size={13} className="text-zinc-400" />
                  <span>Guaranteed safe & secure checkout</span>
                </div>

                <div className="flex items-center gap-2 opacity-50">
                  <CreditCard size={20} className="text-zinc-400" />
                  <span className="text-[11px] text-zinc-400 tracking-wider uppercase font-semibold">
                    VISA • MASTERCARD • APPLE PAY • GOOGLE PAY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Products Carousel / Grid */}
      {recommendedProducts.length > 0 && (
        <section className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-txt tracking-tight">
                You Might Also Like
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Customers frequently purchase these hand-picked favorites
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1 text-sm font-medium text-volt hover:text-volt-light transition-colors group"
            >
              <span>View All</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Order Complete Modal */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#141414] p-6 sm:p-8 flex flex-col items-center text-center gap-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 shadow-lg shadow-green-500/10">
              <CheckCircle2 size={36} />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-2xl font-bold font-heading text-txt">
                Order Placed Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Thank you for your purchase from SkyMart. Your order confirmation and
                tracking receipt have been sent to your email.
              </p>
            </div>

            <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-3.5 flex items-center justify-between text-xs text-zinc-300">
              <span>Order Reference:</span>
              <span className="font-mono text-volt font-bold">
                #SKY-{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full mt-2">
              <button
                type="button"
                onClick={() => {
                  setOrderComplete(false);
                  navigate("/");
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-volt hover:bg-volt-light text-ink font-heading font-semibold text-sm transition cursor-pointer"
              >
                Back to Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderComplete(false);
                  navigate("/shop");
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-txt font-heading font-semibold text-sm transition cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;

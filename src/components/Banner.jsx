import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const Banner = ({
  greeting = "GOOD EVENING 👋",
  userName = "Ram Naam",
}) => {
  let navigate = useNavigate();
  return (
    <div
      className="relative w-full rounded-3xl border border-white bg-ink overflow-hidden p-6 sm:p-8 lg:p-10 font-body"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}
    >
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
        {/* Left Section: Greeting, Heading, Subtitle & Buttons */}
        <div className="max-w-2xl">
          {/* Greeting Tag */}
          <p className="font-heading text-xs sm:text-sm font-semibold tracking-wider text-volt uppercase mb-3 sm:mb-4">
            {greeting}
          </p>

          {/* Heading */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            <span className="text-txt block">Welcome back,</span>
            <span className="text-volt block mt-1">{userName}!</span>
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-5 text-txt/60 text-sm sm:text-base leading-relaxed max-w-xl font-body">
            Discover today's picks — hand-curated products across electronics, fashion, and more.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-volt text-ink font-heading font-semibold text-sm hover:bg-volt-light active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-volt/10"
            >
              <span>Shop Now</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white text-txt/80 hover:text-txt font-medium text-sm active:scale-95 transition-all duration-200 cursor-pointer"
            >
              View All Products
            </button>
          </div>
        </div>

        {/* Right Section: Stat Cards */}
        <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 w-full sm:w-auto shrink-0">
          {/* Products Available Card */}
          <div className="flex-1 sm:flex-initial w-full sm:w-44 px-5 py-5 rounded-2xl bg-volt/10 border border-volt/[0.5] flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <span className="font-heading text-3xl sm:text-3xl font-bold text-volt tracking-tight">
              20+
            </span>
            <span className="font-body text-xs text-txt/60 font-medium mt-1">
              Products Available
            </span>
          </div>

          {/* Free Delivery Card */}
          <div className="flex-1 sm:flex-initial w-full sm:w-44 px-5 py-6 rounded-2xl bg-white/5 border border-white flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <span className="font-heading text-3xl sm:text-3xl font-bold text-txt tracking-tight">
              Free
            </span>
            <span className="font-body text-xs text-txt/60 font-medium mt-1">
              Delivery on ₹999+
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

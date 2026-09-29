import React from "react";
import { useNavigate } from "react-router";
import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  Heart,
  ArrowRight,
} from "lucide-react";

const About = () => {
  let navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center gap-16 font-body">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-volt flex items-center justify-center mx-auto mb-6 shadow-lg shadow-volt/20">
          <Zap size={28} className="text-black fill-black" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 font-heading">
          About <span className="text-volt">SkyMart</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          SkyMart is a next-generation e-commerce platform built to make online
          shopping fast, fair, and enjoyable — for everyone.
        </p>
      </div>

      {/* Stats */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl px-6 py-8 text-center hover:border-zinc-700 transition-colors duration-300">
          <Package size={22} className="text-volt mx-auto mb-3" />
          <div className="text-3xl font-extrabold font-heading">20K+</div>
          <div className="text-sm text-gray-500 mt-1">Products</div>
        </div>
        <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl px-6 py-8 text-center hover:border-zinc-700 transition-colors duration-300">
          <Users size={22} className="text-volt mx-auto mb-3" />
          <div className="text-3xl font-extrabold font-heading">50K+</div>
          <div className="text-sm text-gray-500 mt-1">Happy Customers</div>
        </div>
        <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl px-6 py-8 text-center hover:border-zinc-700 transition-colors duration-300">
          <Star size={22} className="text-volt mx-auto mb-3" />
          <div className="text-3xl font-extrabold font-heading">4.9</div>
          <div className="text-sm text-gray-500 mt-1">Avg. Rating</div>
        </div>
        <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl px-6 py-8 text-center hover:border-zinc-700 transition-colors duration-300">
          <Truck size={22} className="text-volt mx-auto mb-3" />
          <div className="text-3xl font-extrabold font-heading">99%</div>
          <div className="text-sm text-gray-500 mt-1">On-time Delivery</div>
        </div>
      </div>

      {/* Our Story */}
      <div className="w-full max-w-5xl mx-auto border border-zinc-800/90 bg-[#121214]/60 rounded-3xl p-8 sm:p-10 hover:border-zinc-700 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-5 font-heading">Our Story</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          SkyMart started in 2022 as a small side project — two engineers tired
          of bloated, slow e-commerce experiences. We asked ourselves: what if
          shopping online was actually{" "}
          <span className="italic text-gray-300">enjoyable</span>?
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          Three years later, SkyMart serves over 50,000 customers across the
          country. We stock electronics, fashion, jewelry, and everyday
          essentials — all at prices that don't require a second mortgage.
        </p>
        <p className="text-gray-400 leading-relaxed">
          We're still the same team at heart: obsessed with speed, transparency,
          and making you feel good about every purchase you make here.
        </p>
      </div>

      {/* What We Stand For */}
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-8 font-heading">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl p-6 flex items-start sm:items-center gap-4 hover:border-zinc-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} className="text-volt" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">Trust</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every product is verified for quality and authenticity before
                listing.
              </p>
            </div>
          </div>

          <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl p-6 flex items-start sm:items-center gap-4 hover:border-zinc-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-center shrink-0">
              <Truck size={22} className="text-volt" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">Speed</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We obsess over delivery times so your orders arrive when
                promised.
              </p>
            </div>
          </div>

          <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl p-6 flex items-start sm:items-center gap-4 hover:border-zinc-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-center shrink-0">
              <Heart size={22} className="text-volt" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">Community</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Built around real customer feedback, not just business metrics.
              </p>
            </div>
          </div>

          <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl p-6 flex items-start sm:items-center gap-4 hover:border-zinc-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-volt/10 border border-volt/30 flex items-center justify-center shrink-0">
              <Star size={22} className="text-volt" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">Quality</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We curate the best — no filler, no junk, just great products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-8 font-heading">
          Meet the Team
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#ccff00] text-black font-extrabold text-xl flex items-center justify-center mb-4 shadow-sm">
              A
            </div>
            <div className="font-bold text-white text-base">Aryan Shah</div>
            <div className="text-sm text-gray-400 mt-1">Founder & CEO</div>
          </div>

          <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#2563eb] text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-sm">
              P
            </div>
            <div className="font-bold text-white text-base">Priya Mehta</div>
            <div className="text-sm text-gray-400 mt-1">Head of Product</div>
          </div>

          <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#a855f7] text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-sm">
              R
            </div>
            <div className="font-bold text-white text-base">Rohan Verma</div>
            <div className="text-sm text-gray-400 mt-1">Lead Engineer</div>
          </div>

          <div className="border border-zinc-800/90 bg-[#121214]/60 rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#ff0066] text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-sm">
              S
            </div>
            <div className="font-bold text-white text-base">Sneha Kapoor</div>
            <div className="text-sm text-gray-400 mt-1">Design Director</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full max-w-5xl mx-auto border border-zinc-800/90 bg-[#121214]/60 rounded-3xl py-12 px-6 sm:px-10 text-center hover:border-zinc-700 transition-all duration-300 mb-8">
        <h2 className="text-3xl font-extrabold mb-3 font-heading text-white">
          Ready to shop?
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          Explore thousands of products at unbeatable prices.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-volt text-black font-bold px-7 py-3 rounded-xl inline-flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] shadow-md cursor-pointer"
        >
          Browse Products <ArrowRight size={18} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default About;

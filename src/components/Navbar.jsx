import React, { useContext } from "react";
import { Zap, ShoppingCart, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { MyStoreContext } from "../context/ShopContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItemCount = 0 } = useContext(MyStoreContext) || {};
  const totalCartCount = cartItemCount;
  return (
    <nav className="w-full bg-ink  font-body">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-volt flex items-center justify-center shadow-sm shadow-volt/20">
            <Zap size={18} className="text-ink fill-ink" />
          </div>

          <span className="font-heading text-lg font-bold tracking-tight">
            <span className="text-txt">Sky</span>
            <span className="text-volt">Mart</span>
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <NavLink to={"/"}>
            {({ isActive }) => (
              <span
                className={
                  isActive
                    ? "text-volt font-medium hover:text-volt-light transition"
                    : "text-txt/60 hover:text-txt transition"
                }
              >
                Home
              </span>
            )}
          </NavLink>

          <NavLink to={"/shop"}>
            {({ isActive }) => (
              <span
                className={
                  isActive
                    ? "text-volt font-medium hover:text-volt-light transition"
                    : "text-txt/60 hover:text-txt transition"
                }
              >
                Shop
              </span>
            )}
          </NavLink>

          <NavLink to={"/about"}>
            {({ isActive }) => (
              <span
                className={
                  isActive
                    ? "text-volt font-medium hover:text-volt-light transition"
                    : "text-txt/60 hover:text-txt transition"
                }
              >
                About
              </span>
            )}
          </NavLink>

          
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* User */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5">
            <div className="w-6 h-6 rounded-lg bg-volt flex items-center justify-center">
              <span className="text-ink text-xs font-bold font-heading">R</span>
            </div>

            <span className="text-sm text-txt/80 font-medium">Ram Naam</span>
          </div>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            title="View Shopping Cart"
            aria-label="View Shopping Cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-xl
                       border border-white/10 bg-white/5
                       text-txt/80 hover:text-txt hover:bg-white/10
                       active:scale-95 transition cursor-pointer"
          >
            <ShoppingCart size={19} strokeWidth={1.8} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-volt text-ink text-[11px] font-bold font-heading flex items-center justify-center shadow-md shadow-volt/30 animate-in zoom-in-50 duration-200">
                {totalCartCount > 99 ? "99+" : totalCartCount}
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl
                       border border-white/10 bg-white/5
                       text-txt/60 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10
                       active:scale-95 transition cursor-pointer"
          >
            <LogOut size={19} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

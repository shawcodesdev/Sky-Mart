import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-ink py-8 px-4 font-body mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-1.5">
        <h2 className="font-heading font-bold text-base sm:text-lg text-volt tracking-tight">
          SkyMart
        </h2>
        <p className="text-xs sm:text-sm text-txt/50 font-normal">
          © 2025 SkyMart • Built with React • Context API • Axios
        </p>
      </div>
    </footer>
  );
};

export default Footer;

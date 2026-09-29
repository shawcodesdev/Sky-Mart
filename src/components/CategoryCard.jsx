import React from "react";

const CategoryCard = ({ icon: Icon, name, itemCount, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 active:scale-95 select-none"
    >
      {/* Icon */}
      {Icon && (
        <div className="text-slate-800 transition-transform duration-300 group-hover:scale-110">
          <Icon size={38} strokeWidth={2} />
        </div>
      )}

      {/* Category Name */}
      <h3 className="font-heading text-sm sm:text-base font-semibold text-slate-900 mt-4 tracking-tight">
        {name}
      </h3>

      {/* Items Count */}
      <p className="font-body text-xs text-slate-500 mt-1 font-medium">
        {itemCount}
      </p>
    </div>
  );
};

export default CategoryCard;

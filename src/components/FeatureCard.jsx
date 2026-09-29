import React from "react";

const FeatureCard = ({
  icon: Icon,
  title,
  subtitle,
  iconColor,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-ink p-5 sm:p-6 hover:border-white/20 transition-all duration-200 font-body ${className}`}
    >
      {/* Icon */}
      {Icon && (
        <div className="shrink-0 flex items-center justify-center">
          <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${iconColor}`} strokeWidth={2} />
        </div>
      )}

      {/* Details */}
      <div className="flex flex-col">
        <h3 className="font-heading font-bold text-base sm:text-lg text-txt tracking-tight leading-tight">
          {title}
        </h3>
        <p className="font-body text-xs sm:text-sm text-txt/50 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

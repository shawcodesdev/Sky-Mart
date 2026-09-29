import React from "react";

const colorStyles = {
  lime: {
    iconBg: "bg-volt/10",
    iconColor: "text-volt",
  },
  blue: {
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
  },
  amber: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  purple: {
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
};

const StatisticCard = ({
  icon: Icon,
  value = "0",
  title = "Cart Items",
  subtitle = "In your bag",
  color = "lime",
}) => {
  const activeColor = colorStyles[color] || colorStyles.lime;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink p-4 sm:p-5 hover:border-white/20 transition-all duration-200 font-body">
      {/* Icon Badge */}
      {Icon && (
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${activeColor.iconBg} ${activeColor.iconColor}`}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
      )}

      {/* Text Info */}
      <div className="flex flex-col">
        <span className="font-heading text-xl sm:text-2xl font-bold text-txt tracking-tight leading-tight">
          {value}
        </span>
        <span className="font-body text-sm font-medium text-txt/80 mt-0.5">
          {title}
        </span>
        <span className="font-body text-xs text-txt/50">{subtitle}</span>
      </div>
    </div>
  );
};

export default StatisticCard;

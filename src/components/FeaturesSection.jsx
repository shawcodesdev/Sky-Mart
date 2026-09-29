import React from "react";
import { Zap, Shield, Tag } from "lucide-react";
import FeatureCard from "./FeatureCard";

const defaultFeatures = [
  {
    id: "fast-delivery",
    icon: Zap,
    title: "Fast Delivery",
    subtitle: "Same-day on select items",
    iconColor: "text-volt",
  },
  {
    id: "secure-payments",
    icon: Shield,
    title: "Secure Payments",
    subtitle: "100% encrypted checkout",
    iconColor: "text-red-500",
  },
  {
    id: "best-prices",
    icon: Tag,
    title: "Best Prices",
    subtitle: "Price-match guarantee",
    iconColor: "text-yellow-400",
  },
];

const FeaturesSection = ({ features = defaultFeatures, className = "" }) => {
  return (
    <section className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full ${className}`}>
      {features.map((feature) => (
        <FeatureCard
          key={feature.id || feature.title}
          icon={feature.icon}
          title={feature.title}
          subtitle={feature.subtitle}
          iconColor={feature.iconColor}
        />
      ))}
    </section>
  );
};

export default FeaturesSection;

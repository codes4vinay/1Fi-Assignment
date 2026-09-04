import React from "react";
export default function Breadcrumbs({ product, activeVariant }) {
  return (
    <div className="flex items-center gap-3 min-h-[50px] px-4 md:px-6 overflow-x-auto text-[#001b3f] bg-slate-50 whitespace-nowrap text-sm md:text-base">
      <a href="/" className="hover:underline">
        Shop on EMI
      </a>
      <span className="text-slate-400">›</span>
      <a href="/" className="hover:underline">
        Smart Phones
      </a>
      <span className="text-slate-400">›</span>
      <span>{product.brand}</span>
      <span className="text-slate-400">›</span>
      <strong className="font-bold">
        {product.brand} {product.name} ({activeVariant.label})
      </strong>
    </div>
  );
}

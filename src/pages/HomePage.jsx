import React from "react";
import formatMoney from "../utils/formatMoney.js";
export default function HomePage({ products }) {
  return (
    <main className="w-full max-w-[1200px] min-w-0 mx-auto py-8 md:py-10 px-4 md:px-6">
      <h2 className="max-w-full break-words text-2xl md:text-3xl font-bold text-slate-900 mb-8">
        Trending Smartphones on EMI
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const variant = product.variants?.[0] || {};
          return (
            <a
              key={product.slug}
              href={`/products/${product.slug}`}
              className="min-w-0 overflow-hidden bg-white rounded-xl border border-slate-200 p-5 md:p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="relative w-full h-52 md:h-60 flex justify-center items-center mb-5 overflow-hidden">
                <img
                  className="w-full h-full max-w-full max-h-full object-contain"
                  src={variant.imageUrl}
                  alt={product.name}
                />
                {product.badge && (
                  <span className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold uppercase">
                    {product.badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {product.name}
              </h3>
              <div className="text-xl font-bold text-slate-900 mb-2">
                {formatMoney(product.startingPrice)}
              </div>
              <div className="text-sm text-green-600 font-semibold">
                EMI from {formatMoney(product.emiFrom)}/mo
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}

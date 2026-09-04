import React from "react";

export default function ProductDetails({ product }) {
  return (
    <section className="max-w-[1160px] mx-auto px-3 sm:px-4 md:px-6 pb-10">
      <div className="bg-white rounded-[18px] p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">
              Product information
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 mt-1">
              About {product.name}
            </h2>
          </div>
          <div className="text-sm text-slate-600">
            {product.soldCount} sold · {product.rating} ★
          </div>
        </div>
        <p className="text-slate-600 leading-7 max-w-3xl mb-6">
          {product.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {product.specifications?.map((specification) => (
            <div
              key={specification.label}
              className="border border-slate-200 rounded-lg p-3"
            >
              <div className="text-xs text-slate-500 mb-1">
                {specification.label}
              </div>
              <div className="font-semibold text-slate-800">
                {specification.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600">
          <span>
            <strong className="text-slate-800">Sold by:</strong>{" "}
            {product.seller}
          </span>
          <span>
            <strong className="text-slate-800">Warranty:</strong>{" "}
            {product.warranty}
          </span>
        </div>
      </div>
    </section>
  );
}

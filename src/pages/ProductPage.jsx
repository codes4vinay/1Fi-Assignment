import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ProductLeft from "../components/ProductLeft.jsx";
import ProductRight from "../components/ProductRight.jsx";
import ProductDetails from "../components/ProductDetails.jsx";

export default function ProductPage({ product }) {
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  useEffect(() => setActiveVariant(product.variants[0]), [product]);
  return (
    <>
      <Breadcrumbs product={product} activeVariant={activeVariant} />
      <main className="w-full min-w-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] gap-8 max-w-[1160px] mx-auto py-6 md:py-8 px-3 sm:px-4 md:px-6">
        <ProductLeft
          product={product}
          activeVariant={activeVariant}
          setActiveVariant={setActiveVariant}
        />
        <ProductRight product={product} activeVariant={activeVariant} />
      </main>
      <ProductDetails product={product} />
    </>
  );
}

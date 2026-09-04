import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { ErrorState, LoadingState } from "./components/PageState.jsx";
import useCatalogData from "./hooks/useCatalogData.js";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

export default function App() {
  const path = window.location.pathname;
  const { products, product, error } = useCatalogData(path);

  function renderPage() {
    if (error) return <ErrorState message={error} />;
    if (path === "/")
      return products.length ? (
        <HomePage products={products} />
      ) : (
        <LoadingState />
      );
    return product ? <ProductPage product={product} /> : <LoadingState />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{renderPage()}</div>
      <Footer />
    </div>
  );
}

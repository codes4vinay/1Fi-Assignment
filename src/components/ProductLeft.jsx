import React, { useEffect, useState } from "react";

function getVariantFilter(color) {
  if (color === "Cosmic Orange")
    return "sepia(0.8) saturate(2.4) hue-rotate(315deg)";
  if (color === "Silver")
    return "grayscale(0.8) brightness(1.16) contrast(0.86)";
  if (color === "Deep Blue") return "saturate(0.9) hue-rotate(12deg)";
  if (color === "Titanium Violet") return "saturate(0.8) hue-rotate(285deg)";
  if (color === "Titanium Yellow")
    return "sepia(0.45) saturate(1.3) hue-rotate(355deg)";
  if (color === "Hazel") return "sepia(0.3) saturate(0.8) hue-rotate(35deg)";
  return "none";
}

export default function ProductLeft({
  product,
  activeVariant,
  setActiveVariant,
}) {
  const galleryImages = activeVariant.galleryImages?.length
    ? activeVariant.galleryImages
    : [activeVariant.imageUrl];
  const colors = [
    ...new Map(
      product.variants.map((variant) => [variant.color, variant]),
    ).values(),
  ];
  const storageOptions = [
    ...new Set(product.variants.map((variant) => variant.storage)),
  ];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  useEffect(() => setSelectedImage(galleryImages[0]), [activeVariant.slug]);

  return (
    <div className="w-full min-w-0 bg-white rounded-[18px] p-4 sm:p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="text-xs font-bold tracking-[0.18em] text-[#d34242]">
          {product.badge}
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-white shadow-sm px-2 py-1 rounded">
          <span>{product.rating || "4.2"}</span>
          <span className="text-amber-400">★</span>
        </div>
      </div>
      <h1 className="text-3xl md:text-[38px] leading-tight font-normal text-[#161616] mb-1">
        {product.name}
      </h1>
      <div className="text-lg text-slate-600 mb-5">{activeVariant.storage}</div>
      <section className="grid grid-cols-1 md:grid-cols-[82px_1fr] md:grid-rows-[minmax(430px,auto)_auto] gap-x-7 gap-y-6 w-full">
        <div className="flex md:grid md:content-start gap-3 overflow-x-auto md:overflow-visible pb-3 md:pb-0 order-2 md:order-1 max-w-full">
          {galleryImages.map((imageUrl, index) => (
            <button
              key={`${imageUrl}-${index}`}
              type="button"
              className={`grid place-items-center w-[82px] h-[82px] overflow-hidden border rounded-lg bg-white p-2 shrink-0 ${imageUrl === selectedImage ? "border-[#ff6900] ring-1 ring-[#ff6900]" : "border-slate-200"}`}
              onClick={() => setSelectedImage(imageUrl)}
            >
              <img
                className="w-full h-full max-w-full max-h-full object-contain"
                src={imageUrl}
                style={{ filter: getVariantFilter(activeVariant.color) }}
                alt=""
              />
            </button>
          ))}
        </div>
        <div className="relative grid place-items-center bg-white h-[360px] md:h-[430px] overflow-hidden order-1 md:order-2">
          <img
            className="w-full h-full max-w-[360px] md:max-w-[470px] object-contain"
            src={selectedImage}
            style={{ filter: getVariantFilter(activeVariant.color) }}
            alt={`${product.name} ${activeVariant.label}`}
          />
          <span className="absolute left-0 md:left-5 bottom-0 md:bottom-5 px-2.5 py-1 rounded bg-[#0b9ed0] text-white text-sm font-bold">
            1% Cashback
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-start-2 order-3">
          <label className="grid gap-2 text-slate-700 font-semibold">
            <span className="text-sm">Color</span>
            <div className="flex items-center gap-3 h-11">
              {colors.map((variant) => (
                <button
                  key={variant.color}
                  type="button"
                  title={variant.color}
                  aria-label={`Select ${variant.color}`}
                  className={`w-7 h-7 rounded-full border-2 shadow-sm ${variant.color === activeVariant.color ? "ring-2 ring-[#ff6900] ring-offset-2" : "border-slate-300"}`}
                  style={{ backgroundColor: variant.colorHex }}
                  onClick={() => {
                    const matchingVariant =
                      product.variants.find(
                        (candidate) =>
                          candidate.color === variant.color &&
                          candidate.storage === activeVariant.storage,
                      ) || variant;
                    setActiveVariant(matchingVariant);
                  }}
                />
              ))}
            </div>
          </label>
          <label className="grid gap-2 text-slate-700 font-semibold">
            <span className="text-sm">Storage variant</span>
            <select
              className="h-11 px-3 border border-slate-300 rounded-md bg-white font-medium"
              value={activeVariant.storage}
              onChange={(e) =>
                setActiveVariant(
                  product.variants.find(
                    (v) =>
                      v.storage === e.target.value &&
                      v.color === activeVariant.color,
                  ) ||
                    product.variants.find((v) => v.storage === e.target.value),
                )
              }
            >
              {storageOptions.map((storage) => (
                <option key={storage} value={storage}>
                  {storage}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>
    </div>
  );
}

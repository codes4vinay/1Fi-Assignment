import React, { useEffect } from "react";
import formatMoney from "../utils/formatMoney.js";

export default function PlanSuccessModal({ product, variant, plan, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-success-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div
          className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-600"
          aria-hidden="true"
        >
          ✓
        </div>
        <h2
          id="plan-success-title"
          className="text-center text-2xl font-bold text-slate-900"
        >
          Plan selected successfully
        </h2>
        <p className="mt-2 text-center text-slate-600">
          Your EMI plan is ready for the next step.
        </p>
        <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">
            {product.name} · {variant.label}
          </div>
          <div className="mt-2 flex justify-between gap-4">
            <span>
              {formatMoney(plan.monthlyAmount)} x {plan.tenureMonths} months
            </span>
            <span>{plan.interestRate}% interest</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-[#1769e0] p-3 font-semibold text-white transition-colors hover:bg-[#1257ba]"
        >
          Continue
        </button>
      </section>
    </div>
  );
}

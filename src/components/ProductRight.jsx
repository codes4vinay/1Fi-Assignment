import React, { useState, useEffect } from "react";
import formatMoney from "../utils/formatMoney.js";
import PlanSuccessModal from "./PlanSuccessModal.jsx";

export default function ProductRight({ product, activeVariant }) {
  const [selectedPlanId, setSelectedPlanId] = useState(
    activeVariant.emiPlans[0]?.id,
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  useEffect(() => {
    setSelectedPlanId(activeVariant.emiPlans[0]?.id);
    setIsSuccessModalOpen(false);
  }, [activeVariant]);
  return (
    <div className="flex flex-col pt-1 lg:pt-4">
      <div className="mb-5">
        <div className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          {formatMoney(activeVariant.price)}
        </div>
        {activeVariant.mrp > activeVariant.price && (
          <div className="text-lg text-slate-500 mt-1">
            <s>{formatMoney(activeVariant.mrp)}</s>
          </div>
        )}
      </div>
      <div className="text-lg text-slate-800 mb-4">
        EMI plans backed by mutual funds
      </div>
      <div className="flex flex-col gap-3 mb-6">
        {activeVariant.emiPlans.map((plan) => (
          <button
            type="button"
            key={plan.id}
            className={`w-full text-left bg-white border rounded-xl p-3.5 cursor-pointer transition-all ${plan.id === selectedPlanId ? "border-[#279653] ring-1 ring-[#279653]" : "border-slate-200 hover:border-slate-400"}`}
            onClick={() => setSelectedPlanId(plan.id)}
          >
            <div className="flex justify-between items-center gap-3 mb-2">
              <span className="flex items-center gap-2 text-base font-medium text-slate-900">
                <span
                  className={`w-4 h-4 rounded-full border-2 shrink-0 ${plan.id === selectedPlanId ? "border-[#279653] bg-[#279653] ring-2 ring-white ring-inset" : "border-slate-300"}`}
                />
                {formatMoney(plan.monthlyAmount)} x {plan.tenureMonths} months
              </span>
              <span className="text-sm text-slate-600">
                {plan.interestRate === 0
                  ? "0% interest"
                  : `${plan.interestRate}% interest`}
              </span>
            </div>
            {plan.cashback > 0 && (
              <div className="text-sm text-green-600">
                Additional cashback of {formatMoney(plan.cashback)}
              </div>
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setIsSuccessModalOpen(true)}
        className="mt-auto bg-[#1769e0] text-white border-none rounded-lg p-4 text-lg font-semibold cursor-pointer w-full hover:bg-[#1257ba] transition-colors"
      >
        Proceed with Plan
      </button>
      {isSuccessModalOpen && (
        <PlanSuccessModal
          product={product}
          variant={activeVariant}
          plan={
            activeVariant.emiPlans.find((plan) => plan.id === selectedPlanId) ||
            activeVariant.emiPlans[0]
          }
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
}

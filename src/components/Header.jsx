import React from "react";
export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 md:gap-6 min-h-[58px] px-3 md:px-6">
        <a
          className="inline-flex items-baseline text-[#ff6a00] text-2xl font-extrabold tracking-tight shrink-0"
          href="/"
          aria-label="1Fi home"
        >
          <span className="text-slate-900">1</span>
          <span>Fi</span>
        </a>
        <label className="relative min-w-0 w-full max-w-[600px]">
          <span
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-slate-700 rounded-full after:content-[''] after:absolute after:-right-1.5 after:-bottom-1.5 after:w-1.5 after:h-0.5 after:rounded-full after:bg-slate-700 after:rotate-45"
            aria-hidden="true"
          />
          <input
            className="w-full min-w-0 h-11 pl-10 md:pl-12 pr-4 border border-slate-300 rounded-lg text-slate-700 bg-slate-50 outline-none"
            placeholder="Search for smartphones..."
          />
        </label>
        <button className="hidden sm:block h-10 px-4 md:px-5 border-0 rounded-lg text-white bg-[#ff6900] font-bold cursor-pointer">
          Sign Up
        </button>
      </div>
    </header>
  );
}

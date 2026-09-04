import React from "react";
export default function Footer() {
  return (
    <footer className="bg-[#071326] text-white py-8 sm:py-10 px-4 sm:px-6 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:flex-wrap justify-between items-start sm:items-center gap-5">
        <p className="text-xs sm:text-base text-slate-300">
          &copy; 2026 1Fi EMI Store. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
          <a
            className="text-sm text-[#c9d5e6] hover:text-white hover:underline"
            href="#"
          >
            About Us
          </a>
          <a
            className="text-sm text-[#c9d5e6] hover:text-white hover:underline"
            href="#"
          >
            Contact
          </a>
          <a
            className="text-sm text-[#c9d5e6] hover:text-white hover:underline"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-sm text-[#c9d5e6] hover:text-white hover:underline"
            href="#"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

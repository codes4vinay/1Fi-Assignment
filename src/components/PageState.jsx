import React from "react";

export function LoadingState() {
  return (
    <div className="grid min-h-[50vh] place-items-center text-slate-500">
      Loading...
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="grid min-h-[50vh] place-items-center px-6 text-center text-slate-500">
      {message}
    </div>
  );
}

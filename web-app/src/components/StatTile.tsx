import React from "react";

export const StatTile = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl border border-slate/10 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate/50">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate">{value}</p>
    </div>
  );
};

import React from "react";
import classNames from "classnames";

type BadgeProps = {
  label: string;
  tone?: "neutral" | "success" | "warning";
};

export const Badge = ({ label, tone = "neutral" }: BadgeProps) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        {
          "bg-slate/10 text-slate": tone === "neutral",
          "bg-emerald-100 text-emerald-800": tone === "success",
          "bg-amber-100 text-amber-800": tone === "warning"
        }
      )}
    >
      {label}
    </span>
  );
};

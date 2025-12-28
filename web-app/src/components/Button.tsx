import React from "react";
import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
        {
          "bg-ink text-white hover:bg-slate": variant === "primary",
          "border border-slate/10 bg-white text-slate hover:border-slate/30": variant === "secondary",
          "text-slate hover:bg-slate/5": variant === "ghost"
        },
        className
      )}
      {...props}
    />
  );
};

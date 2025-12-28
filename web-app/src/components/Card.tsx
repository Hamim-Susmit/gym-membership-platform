import React from "react";
import classNames from "classnames";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ title, children, className }: CardProps) => {
  return (
    <div className={classNames("rounded-2xl bg-white p-6 shadow-sm", className)}>
      {title ? <h3 className="mb-4 text-sm font-semibold text-slate/70">{title}</h3> : null}
      {children}
    </div>
  );
};

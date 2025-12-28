import React from "react";
import classNames from "classnames";

export const Skeleton = ({ className }: { className?: string }) => {
  return <div className={classNames("h-4 animate-pulse rounded-full bg-slate/10", className)} />;
};

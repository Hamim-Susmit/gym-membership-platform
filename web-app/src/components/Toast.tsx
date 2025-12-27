"use client";

import React from "react";

export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
};

export const Toast = ({ message, onDismiss }: { message: ToastMessage; onDismiss: (id: string) => void }) => {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-white p-4 shadow-lg">
      <div>
        <p className="text-sm font-semibold text-slate">{message.title}</p>
        {message.description ? <p className="mt-1 text-xs text-slate/70">{message.description}</p> : null}
      </div>
      <button className="text-xs font-semibold text-slate/60" onClick={() => onDismiss(message.id)}>
        Close
      </button>
    </div>
  );
};

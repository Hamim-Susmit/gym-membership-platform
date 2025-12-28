"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Toast, ToastMessage } from "@/components/Toast";

const ToastContext = createContext<{
  notify: (title: string, description?: string) => void;
} | null>(null);

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const notify = useCallback((title: string, description?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setMessages((prev) => [...prev, { id, title, description }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((message) => message.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-6 top-6 z-50 space-y-3">
        {messages.map((message) => (
          <Toast key={message.id} message={message} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "Gym Membership Platform",
  description: "Premium multi-location gym platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

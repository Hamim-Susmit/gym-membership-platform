"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/Skeleton";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth/login");
    }
  }, [isLoading, router, user]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export const RoleGuard = ({ roles, children }: { roles: string[]; children: React.ReactNode }) => {
  const { user } = useAuth();
  const roleNames = user?.roles.map((role) => role.name) ?? [];
  const allowed = roles.some((role) => roleNames.includes(role));

  if (!allowed) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate">You do not have access to this section.</p>
      </div>
    );
  }

  return <>{children}</>;
};

"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/Skeleton";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate">Please log in to access this area.</p>
      </div>
    );
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

"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";
import { useAuth } from "@/context/AuthContext";

export default function MemberCardPage() {
  const { user } = useAuth();
  const memberId = user?.id ?? "pending";

  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Digital membership card" subtitle="Scan at check-in for instant access." />
        <Card>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-dashed border-slate/30 bg-slate/5">
              <span className="text-xs uppercase tracking-widest text-slate/40">QR</span>
            </div>
            <p className="text-sm text-slate">Member ID: {memberId}</p>
          </div>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

"use client";

import { QRCodeCanvas } from "qrcode.react";
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
            <QRCodeCanvas value={memberId} size={160} bgColor="#F5F7FA" fgColor="#0F1115" />
            <p className="text-sm text-slate">Member ID: {memberId}</p>
          </div>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

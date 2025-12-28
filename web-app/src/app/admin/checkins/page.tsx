"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function AdminCheckinsPage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader title="Check-in analytics" subtitle="Monitor peak hours and attendance heatmaps." />
          <Card>
            <div className="grid gap-2 md:grid-cols-7">
              {Array.from({ length: 21 }).map((_, index) => (
                <div key={index} className="h-10 rounded-lg bg-slate/10" />
              ))}
            </div>
            <p className="mt-4 text-xs text-slate/60">Heatmap preview (placeholder).</p>
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

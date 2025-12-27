"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { StatTile } from "@/components/StatTile";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";
import { useAdminStats } from "@/hooks/useAdminStats";

export default function AdminDashboardPage() {
  const statsQuery = useAdminStats();
  const stats = statsQuery.data ?? {
    activeMembers: 0,
    weeklyCheckIns: 0,
    classOccupancy: 0,
    trainerUtilization: 0
  };

  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader title="Operations dashboard" subtitle="Multi-location KPIs and performance signals." />
          <div className="grid gap-4 md:grid-cols-4">
            <StatTile label="Active members" value={String(stats.activeMembers)} />
            <StatTile label="Weekly check-ins" value={String(stats.weeklyCheckIns)} />
            <StatTile label="Class occupancy" value={`${stats.classOccupancy}%`} />
            <StatTile label="Trainer utilization" value={`${stats.trainerUtilization}%`} />
          </div>
          <Card>
            <p className="text-sm text-slate/60">Filter controls and charts will be added with analytics data.</p>
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

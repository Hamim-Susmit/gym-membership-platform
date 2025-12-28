"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";
import { useCheckIns } from "@/hooks/useCheckIns";
import { formatDateTime } from "@/utils/format";

const buildHeatmap = (timestamps: string[]) => {
  const bins = Array.from({ length: 21 }, () => 0);
  timestamps.forEach((timestamp) => {
    const date = new Date(timestamp);
    const dayIndex = date.getDay();
    const hour = date.getHours();
    const hourBucket = Math.min(2, Math.floor(hour / 8));
    const index = dayIndex * 3 + hourBucket;
    bins[index] += 1;
  });
  return bins;
};

export default function AdminCheckinsPage() {
  const checkInsQuery = useCheckIns();
  const heatmap = buildHeatmap(checkInsQuery.data?.map((item) => item.timestamp) ?? []);

  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader title="Check-in analytics" subtitle="Monitor peak hours and attendance heatmaps." />
          <Card>
            <div className="grid gap-2 md:grid-cols-7">
              {heatmap.map((value, index) => (
                <div
                  key={index}
                  className="h-10 rounded-lg"
                  style={{ backgroundColor: `rgba(59,130,246,${Math.min(0.15 + value * 0.08, 0.8)})` }}
                  title={`Check-ins: ${value}`}
                />
              ))}
            </div>
            <p className="mt-4 text-xs text-slate/60">Heatmap shows check-ins grouped by day and time block.</p>
          </Card>
          <Card title="Recent check-ins">
            <div className="space-y-3 text-sm text-slate">
              {checkInsQuery.data?.length ? (
                checkInsQuery.data.slice(0, 6).map((checkIn) => (
                  <div key={checkIn.id} className="flex items-center justify-between border-b border-slate/10 pb-2">
                    <span>Location {checkIn.locationId}</span>
                    <span className="text-xs text-slate/60">{formatDateTime(checkIn.timestamp)}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate/60">No check-ins recorded yet.</p>
              )}
            </div>
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { StatTile } from "@/components/StatTile";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";
import { useBookings } from "@/hooks/useBookings";
import { useLocations } from "@/hooks/useLocations";
import { formatDateTime } from "@/utils/format";

export default function MemberDashboardPage() {
  const bookingsQuery = useBookings();
  const locationsQuery = useLocations();

  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Member dashboard" subtitle="Your upcoming classes, visits, and membership perks." />
        <div className="grid gap-4 md:grid-cols-3">
          <StatTile label="Upcoming classes" value={String(bookingsQuery.data?.length ?? 0)} />
          <StatTile label="Active locations" value={String(locationsQuery.data?.length ?? 0)} />
          <StatTile label="Membership tier" value="Elite" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Next class">
            <p className="text-lg font-semibold text-slate">
              {bookingsQuery.data?.[0]?.class?.name ?? "No bookings yet"}
            </p>
            <p className="mt-2 text-sm text-slate/70">
              {formatDateTime(bookingsQuery.data?.[0]?.class?.startTime)}
            </p>
          </Card>
          <Card title="Last check-in">
            <p className="text-sm text-slate/70">Visit history will appear once you check in.</p>
          </Card>
        </div>
      </AuthGuard>
    </DashboardLayout>
  );
}

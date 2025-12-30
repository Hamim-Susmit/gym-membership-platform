"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";
import { useBookings } from "@/hooks/useBookings";
import { formatDateTime } from "@/utils/format";

export default function MemberBookingsPage() {
  const bookingsQuery = useBookings();

  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="My bookings" subtitle="Review or cancel upcoming classes." />
        <Card>
          <div className="space-y-4">
            {bookingsQuery.data?.length ? (
              bookingsQuery.data.map((booking) => (
                <div key={booking.id} className="flex flex-col gap-3 border-b border-slate/10 pb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate">{booking.class?.name ?? "Class"}</p>
                    <p className="text-xs text-slate/60">{formatDateTime(booking.class?.startTime)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge label={booking.status} tone={booking.status === "BOOKED" ? "success" : "neutral"} />
                    <Button variant="secondary">Cancel</Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate/60">No bookings yet. Reserve a class to get started.</p>
            )}
          </div>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

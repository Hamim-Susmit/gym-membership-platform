"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";
import { useCheckIns } from "@/hooks/useCheckIns";
import { formatDateTime } from "@/utils/format";

export default function MemberAttendancePage() {
  const checkInsQuery = useCheckIns();

  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Attendance history" subtitle="Track visits and trends across locations." />
        <Card>
          <div className="space-y-4">
            {checkInsQuery.data?.length ? (
              checkInsQuery.data.map((checkIn) => (
                <div key={checkIn.id} className="flex items-center justify-between border-b border-slate/10 pb-3 text-sm">
                  <span className="text-slate">Location {checkIn.locationId}</span>
                  <span className="text-xs text-slate/60">{formatDateTime(checkIn.timestamp)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate/60">Attendance logs will appear after your first check-in.</p>
            )}
          </div>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";

export default function MemberAttendancePage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Attendance history" subtitle="Track visits and trends across locations." />
        <Card>
          <p className="text-sm text-slate/60">Attendance logs will appear after your first check-in.</p>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

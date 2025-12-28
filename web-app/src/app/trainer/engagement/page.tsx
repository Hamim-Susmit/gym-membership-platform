"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { StatTile } from "@/components/StatTile";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function TrainerEngagementPage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["TRAINER"]}>
          <PageHeader title="Engagement overview" subtitle="Attendance trends and class popularity." />
          <div className="grid gap-4 md:grid-cols-3">
            <StatTile label="Weekly attendance" value="78%" />
            <StatTile label="Class fill rate" value="86%" />
            <StatTile label="Client retention" value="94%" />
          </div>
          <Card>
            <p className="text-sm text-slate/60">Engagement analytics will populate from attendance data.</p>
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

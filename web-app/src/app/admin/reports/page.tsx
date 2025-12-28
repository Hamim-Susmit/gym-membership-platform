"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function AdminReportsPage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader title="Reports" subtitle="Export summaries for attendance and revenue." actions={<Button>Export CSV</Button>} />
          <Card>
            <p className="text-sm text-slate/60">Report exports will be wired to /reports endpoints.</p>
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

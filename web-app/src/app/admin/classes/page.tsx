"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function AdminClassesPage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader title="Class scheduling" subtitle="Create, edit, or cancel classes." actions={<Button>New class</Button>} />
          <div className="grid gap-4 md:grid-cols-2">
            {["Pilates Flow", "Strength Circuit"].map((className) => (
              <Card key={className}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate">{className}</p>
                    <p className="text-xs text-slate/60">Studio B · 22 capacity</p>
                  </div>
                  <Badge label="Scheduled" tone="success" />
                </div>
              </Card>
            ))}
          </div>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

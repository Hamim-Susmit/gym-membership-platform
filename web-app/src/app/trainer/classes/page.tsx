"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function TrainerClassesPage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["TRAINER"]}>
          <PageHeader title="Assigned classes" subtitle="Monitor attendance and capacity." />
          <div className="grid gap-4 md:grid-cols-2">
            {["HIIT", "Yoga Flow"].map((className) => (
              <Card key={className}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate">{className}</p>
                    <p className="text-xs text-slate/60">Studio A · 18 booked</p>
                  </div>
                  <Badge label="On track" tone="success" />
                </div>
              </Card>
            ))}
          </div>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

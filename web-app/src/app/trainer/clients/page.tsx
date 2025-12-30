"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Table } from "@/components/Table";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function TrainerClientsPage() {
  const rows = [
    ["Alyssa Brooks", "8 sessions", "Active"],
    ["Jordan Lee", "4 sessions", "Needs follow-up"],
    ["Maya Patel", "12 sessions", "Active"]
  ];

  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["TRAINER"]}>
          <PageHeader title="Client list" subtitle="Session history and engagement cues." />
          <Card>
            <Table columns={["Client", "Sessions", "Status"]} rows={rows} />
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

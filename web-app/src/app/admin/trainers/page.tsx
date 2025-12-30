"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function AdminTrainersPage() {
  const rows = [
    ["Alyssa Brooks", "Downtown", "Active"],
    ["Jordan Lee", "Uptown", "Pending"],
    ["Maya Patel", "Westside", "Active"]
  ];

  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader
            title="Trainer management"
            subtitle="Invite, assign, and manage trainers."
            actions={<Button>Invite trainer</Button>}
          />
          <Card>
            <Table columns={["Trainer", "Location", "Status"]} rows={rows} />
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

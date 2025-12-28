"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";
import { useTrainers } from "@/hooks/useTrainers";

export default function AdminTrainersPage() {
  const trainersQuery = useTrainers();
  const rows = (trainersQuery.data ?? []).map((trainer) => [
    `${trainer.firstName} ${trainer.lastName}`,
    "Assigned",
    trainer.isActive ? "Active" : "Inactive"
  ]);

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
            <Table
              columns={["Trainer", "Location", "Status"]}
              rows={rows.length ? rows : [["No trainers yet", "", ""]]}
            />
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

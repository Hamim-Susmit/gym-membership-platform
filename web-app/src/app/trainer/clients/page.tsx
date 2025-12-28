"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Table } from "@/components/Table";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";
import { useTrainerClients } from "@/hooks/useTrainerClients";

export default function TrainerClientsPage() {
  const clientsQuery = useTrainerClients();
  const rows = (clientsQuery.data ?? []).map((client) => [
    `${client.firstName} ${client.lastName}`,
    "Active",
    "View"
  ]);

  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["TRAINER"]}>
          <PageHeader title="Client list" subtitle="Session history and engagement cues." />
          <Card>
            <Table
              columns={["Client", "Status", "Action"]}
              rows={rows.length ? rows : [["No clients yet", "", ""]]}
            />
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

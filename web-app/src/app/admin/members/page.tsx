"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";
import { useMembers } from "@/hooks/useMembers";

export default function AdminMembersPage() {
  const membersQuery = useMembers();
  const rows = (membersQuery.data ?? []).map((member) => [
    `${member.firstName} ${member.lastName}`,
    member.isActive ? "Active" : "Inactive",
    "View"
  ]);

  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader
            title="Member management"
            subtitle="Search, activate, or deactivate members."
            actions={<Button>Invite member</Button>}
          />
          <Card>
            <Table columns={["Member", "Status", "Action"]} rows={rows.length ? rows : [["No members yet", "", ""]]} />
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";
import { useAuth } from "@/context/AuthContext";
import { formatName } from "@/utils/format";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Profile & settings" subtitle="Manage your account preferences." />
        <Card>
          <p className="text-lg font-semibold text-slate">{user ? formatName(user.firstName, user.lastName) : "Member"}</p>
          <p className="mt-2 text-sm text-slate/60">{user?.email}</p>
          <p className="mt-2 text-xs text-slate/50">Roles: {user?.roles.map((role: any) => role.name).join(", ")}</p>
        </Card>
        <Card>
          <Button variant="secondary" onClick={logout}>
            Log out
          </Button>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

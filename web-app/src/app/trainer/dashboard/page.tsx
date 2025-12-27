"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { StatTile } from "@/components/StatTile";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";
import { useTrainerSessions } from "@/hooks/useTrainerSessions";

export default function TrainerDashboardPage() {
  const sessionsQuery = useTrainerSessions();

  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["TRAINER"]}>
          <PageHeader title="Trainer dashboard" subtitle="Today's sessions, classes, and engagement." />
          <div className="grid gap-4 md:grid-cols-3">
            <StatTile label="Today's sessions" value={String(sessionsQuery.data?.length ?? 0)} />
            <StatTile label="Active clients" value="18" />
            <StatTile label="Class attendance" value="92%" />
          </div>
          <Card title="Upcoming sessions">
            {sessionsQuery.data?.length ? (
              <ul className="space-y-3 text-sm text-slate">
                {sessionsQuery.data.map((session) => (
                  <li key={session.id} className="flex items-center justify-between">
                    <span>Client {session.clientId}</span>
                    <span className="text-xs text-slate/60">{session.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate/60">No sessions scheduled yet.</p>
            )}
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

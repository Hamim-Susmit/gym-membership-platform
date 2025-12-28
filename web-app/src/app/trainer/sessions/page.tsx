"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function TrainerSessionsPage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["TRAINER"]}>
          <PageHeader title="Session notes" subtitle="Capture outcomes after each session." />
          <Card>
            <div className="space-y-4">
              <textarea
                className="min-h-[160px] w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
                placeholder="Log session notes, flags, and next steps."
              />
              <div className="flex justify-end">
                <Button>Save note</Button>
              </div>
            </div>
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

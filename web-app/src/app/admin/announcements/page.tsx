"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";

export default function AdminAnnouncementsPage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader title="Announcements" subtitle="Target messages by tier or location." actions={<Button>New announcement</Button>} />
          <Card>
            <div className="space-y-4 text-sm text-slate/70">
              <p>Holiday hours update · Sent to all locations</p>
              <p>New recovery lounge · Targeted to Premium+ tiers</p>
            </div>
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

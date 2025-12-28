"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Notifications" subtitle="Reminders, updates, and announcements." />
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate">Class reminder</p>
                <p className="text-xs text-slate/60">Yoga Flow starts in 2 hours.</p>
              </div>
              <Badge label="New" tone="warning" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate">Membership update</p>
                <p className="text-xs text-slate/60">Elite tier perks refreshed.</p>
              </div>
              <Badge label="Read" />
            </div>
          </div>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

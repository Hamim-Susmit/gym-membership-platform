"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard, RoleGuard } from "@/lib/guards";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { formatDateTime } from "@/utils/format";
import { useToast } from "@/context/ToastContext";

export default function AdminAnnouncementsPage() {
  const announcementsQuery = useAnnouncements();
  const { notify } = useToast();

  return (
    <DashboardLayout>
      <AuthGuard>
        <RoleGuard roles={["LOCATION_ADMIN", "SUPER_ADMIN"]}>
          <PageHeader
            title="Announcements"
            subtitle="Target messages by tier or location."
            actions={<Button onClick={() => notify("Create announcement", "Hook this to /admin/announcements")}>New announcement</Button>}
          />
          <Card>
            <div className="space-y-4 text-sm text-slate/70">
              {announcementsQuery.data?.length ? (
                announcementsQuery.data.map((announcement) => (
                  <div key={announcement.id} className="flex items-center justify-between border-b border-slate/10 pb-3">
                    <div>
                      <p className="text-sm font-semibold text-slate">{announcement.title}</p>
                      <p className="text-xs text-slate/60">{announcement.message}</p>
                    </div>
                    <p className="text-xs text-slate/50">{formatDateTime(announcement.createdAt)}</p>
                  </div>
                ))
              ) : (
                <p>No announcements yet.</p>
              )}
            </div>
          </Card>
        </RoleGuard>
      </AuthGuard>
    </DashboardLayout>
  );
}

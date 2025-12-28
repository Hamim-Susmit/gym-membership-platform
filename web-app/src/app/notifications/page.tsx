"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDateTime } from "@/utils/format";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";

export default function NotificationsPage() {
  const notificationsQuery = useNotifications();
  const queryClient = useQueryClient();

  const markReadMutation = useMutation({
    mutationFn: (notificationId: string) => apiClient.patch(`${endpoints.notifications}/${notificationId}`, { readAt: new Date().toISOString() }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["notifications"] })
  });

  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Notifications" subtitle="Reminders, updates, and announcements." />
        <Card>
          <div className="space-y-4">
            {notificationsQuery.data?.length ? (
              notificationsQuery.data.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate">{notification.title}</p>
                    <p className="text-xs text-slate/60">{notification.body}</p>
                    <p className="mt-1 text-xs text-slate/50">{formatDateTime(notification.createdAt)}</p>
                  </div>
                  <Badge label={notification.readAt ? "Read" : "New"} tone={notification.readAt ? "neutral" : "warning"} />
                  {!notification.readAt ? (
                    <button
                      className="text-xs font-semibold text-slate/60"
                      onClick={() => markReadMutation.mutate(notification.id)}
                    >
                      Mark read
                    </button>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate/60">You're all caught up.</p>
            )}
          </div>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

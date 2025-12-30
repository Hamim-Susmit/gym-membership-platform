"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";
import { useClasses } from "@/hooks/useClasses";
import { formatDateTime } from "@/utils/format";

export default function MemberClassesPage() {
  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState("");
  const classesQuery = useClasses(locationId, date);

  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Class schedule" subtitle="Filter by location, date, or trainer." />
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-xs font-semibold uppercase text-slate/50">
              Location ID
              <input
                value={locationId}
                onChange={(event) => setLocationId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
                placeholder="Optional"
              />
            </label>
            <label className="text-xs font-semibold uppercase text-slate/50">
              Date
              <input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
                placeholder="YYYY-MM-DD"
              />
            </label>
          </div>
        </Card>
        <Card title="Upcoming classes">
          <div className="space-y-4">
            {classesQuery.data?.length ? (
              classesQuery.data.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between border-b border-slate/10 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate">{classItem.name}</p>
                    <p className="text-xs text-slate/60">{formatDateTime(classItem.startTime)}</p>
                  </div>
                  <Button variant="secondary">Reserve</Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate/60">No classes match your filters yet.</p>
            )}
          </div>
        </Card>
      </AuthGuard>
    </DashboardLayout>
  );
}

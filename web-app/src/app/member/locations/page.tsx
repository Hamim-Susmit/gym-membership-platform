"use client";

import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/lib/guards";
import { useLocations } from "@/hooks/useLocations";

export default function MemberLocationsPage() {
  const locationsQuery = useLocations();

  return (
    <DashboardLayout>
      <AuthGuard>
        <PageHeader title="Locations" subtitle="Hours, amenities, and premium services." />
        <div className="grid gap-4 md:grid-cols-2">
          {locationsQuery.data?.length ? (
            locationsQuery.data.map((location) => (
              <Card key={location.id}>
                <p className="text-sm font-semibold text-slate">{location.name}</p>
                <p className="mt-2 text-xs text-slate/60">{location.address}</p>
                <p className="mt-1 text-xs text-slate/60">
                  {location.city}, {location.state}
                </p>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-sm text-slate/60">No locations available yet.</p>
            </Card>
          )}
        </div>
      </AuthGuard>
    </DashboardLayout>
  );
}

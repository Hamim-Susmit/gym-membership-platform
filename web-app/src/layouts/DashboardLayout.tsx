"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const navSections = {
  member: [
    { label: "Dashboard", href: "/member/dashboard" },
    { label: "Classes", href: "/member/classes" },
    { label: "Bookings", href: "/member/bookings" },
    { label: "Attendance", href: "/member/attendance" },
    { label: "Locations", href: "/member/locations" },
    { label: "Membership Card", href: "/member/card" }
  ],
  trainer: [
    { label: "Dashboard", href: "/trainer/dashboard" },
    { label: "Clients", href: "/trainer/clients" },
    { label: "Sessions", href: "/trainer/sessions" },
    { label: "Classes", href: "/trainer/classes" },
    { label: "Engagement", href: "/trainer/engagement" }
  ],
  admin: [
    { label: "Overview", href: "/admin/dashboard" },
    { label: "Members", href: "/admin/members" },
    { label: "Trainers", href: "/admin/trainers" },
    { label: "Classes", href: "/admin/classes" },
    { label: "Check-ins", href: "/admin/checkins" },
    { label: "Announcements", href: "/admin/announcements" },
    { label: "Reports", href: "/admin/reports" }
  ]
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const roles = user?.roles.map((role) => role.name) ?? [];
  const isTrainer = roles.includes("TRAINER");
  const isAdmin = roles.includes("LOCATION_ADMIN") || roles.includes("SUPER_ADMIN");

  const navLinks = isAdmin ? navSections.admin : isTrainer ? navSections.trainer : navSections.member;

  return (
    <div className="min-h-screen bg-mist">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        <aside className="hidden w-64 flex-shrink-0 flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm lg:flex">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate/50">Premium Fitness</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">Gym Platform</h2>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-slate hover:bg-slate/5">
                {link.label}
              </Link>
            ))}
            <Link href="/notifications" className="rounded-lg px-3 py-2 text-slate hover:bg-slate/5">
              Notifications
            </Link>
            <Link href="/profile" className="rounded-lg px-3 py-2 text-slate hover:bg-slate/5">
              Profile
            </Link>
          </nav>
          <button
            className="mt-auto rounded-xl border border-slate/10 px-4 py-2 text-sm font-semibold text-slate hover:border-slate/30"
            onClick={logout}
          >
            Log out
          </button>
        </aside>
        <main className="flex-1 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};

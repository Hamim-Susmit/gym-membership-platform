"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function RegisterPage() {
  const { notify } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post(endpoints.register, {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password
      });
      await login(formState.email, formState.password);
      router.replace("/member/dashboard");
    } catch (error) {
      notify("Registration failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 rounded-3xl bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate/50">Membership</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">Create your account</h1>
          <p className="mt-2 text-sm text-slate/70">Start your luxury fitness journey.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-xs font-semibold uppercase text-slate/50">
            First name
            <input
              value={formState.firstName}
              onChange={(event) => setFormState((prev) => ({ ...prev, firstName: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-slate/50">
            Last name
            <input
              value={formState.lastName}
              onChange={(event) => setFormState((prev) => ({ ...prev, lastName: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="md:col-span-2 block text-xs font-semibold uppercase text-slate/50">
            Email
            <input
              type="email"
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="md:col-span-2 block text-xs font-semibold uppercase text-slate/50">
            Password
            <input
              type="password"
              value={formState.password}
              onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              required
            />
          </label>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
        <div className="flex items-center justify-between text-xs text-slate/60">
          <Link href="/auth/login" className="font-semibold text-slate">
            Back to sign in
          </Link>
          <span>Need help? Contact concierge.</span>
        </div>
      </form>
    </div>
  );
}

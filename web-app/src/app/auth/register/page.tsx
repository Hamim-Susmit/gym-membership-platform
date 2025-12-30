"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { notify } = useToast();
  const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await apiClient.post(endpoints.register, { firstName, lastName, email, password });
      // automatically login after successful registration
      await login(email, password);
      notify("Account created", "Welcome! You are now signed in.");
      router.push("/");
    } catch (err) {
      notify("Registration failed", err instanceof Error ? err.message : "Please try again.");
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-slate/50">
            Last name
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="md:col-span-2 block text-xs font-semibold uppercase text-slate/50">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="md:col-span-2 block text-xs font-semibold uppercase text-slate/50">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { notify } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (error) {
      notify("Login failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate/50">Member access</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-slate/70">Sign in to manage your membership.</p>
        </div>
        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase text-slate/50">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-slate/50">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate/10 px-4 py-3 text-sm"
              placeholder="••••••••"
              required
            />
          </label>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
        <div className="flex items-center justify-between text-xs text-slate/60">
          <Link href="/auth/register" className="font-semibold text-slate">
            Create account
          </Link>
          <span>Forgot password? Contact concierge.</span>
        </div>
      </form>
    </div>
  );
}

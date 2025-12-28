"use client";

import { Button } from "@/components/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-6">
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Something went wrong</h2>
        <p className="mt-2 text-sm text-slate/70">Please refresh or try again shortly.</p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}

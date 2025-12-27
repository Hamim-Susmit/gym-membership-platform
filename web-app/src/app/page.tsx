import Link from "next/link";
import { Button } from "@/components/Button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-6">
      <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate/50">Premium Fitness</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">Gym Membership Platform</h1>
        <p className="mt-4 text-sm text-slate/70">
          Access member, trainer, and admin experiences with tailored dashboards and premium booking flows.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/auth/login">
            <Button className="w-full">Sign in</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="secondary" className="w-full">
              Create account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

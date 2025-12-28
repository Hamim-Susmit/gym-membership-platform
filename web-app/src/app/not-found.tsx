import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-6">
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-slate/70">The requested route does not exist.</p>
        <Link href="/">
          <Button className="mt-6">Go home</Button>
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 border border-dotted border-mdlinx-secondary/30 bg-white p-10 text-center shadow-panel">
      <Badge>Thank you</Badge>
      <h1 className="font-serif text-4xl text-mdlinx-navy">Assessment submitted.</h1>
      <p className="text-mdlinx-secondary">
        Your response is now part of the MDLinx assessment dataset. The admin dashboard combines team input, role-level
        patterns, and AI-assisted analysis to help turn responses into strategic direction.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/">
          <Button variant="secondary">Back home</Button>
        </Link>
        <Link href="/admin">
          <Button>Open dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

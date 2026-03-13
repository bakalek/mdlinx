import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 border border-dotted border-mdlinx-secondary/30 bg-white p-10 text-center shadow-panel">
      <Badge>Thank you</Badge>
      <h1 className="font-serif text-4xl text-mdlinx-navy">See you at dinner.</h1>
      <p className="text-mdlinx-secondary">
        Your response has been captured in the scaffold flow. The next step is wiring persistence and turning team input
        into visual insights for the admin dashboard.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/">
          <Button variant="secondary">Back home</Button>
        </Link>
        <Link href="/admin">
          <Button>Open admin</Button>
        </Link>
      </div>
    </div>
  );
}

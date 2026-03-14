"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function AdminAccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(searchParams.get("error") === "invalid" ? "Incorrect password." : "");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setSubmitting(false);

    if (!response.ok) {
      setError("Incorrect password.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="mx-auto max-w-xl border border-dotted border-mdlinx-secondary/30 bg-white p-8 shadow-panel">
      <div className="space-y-4">
        <Badge>Private dashboard</Badge>
        <div className="space-y-2">
          <h1 className="font-serif text-4xl text-mdlinx-navy">Admin access</h1>
          <p className="text-sm leading-7 text-mdlinx-secondary">
            Enter the shared password to review team responses, chart summaries, and dinner conversation starters.
          </p>
        </div>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2 text-sm font-medium text-mdlinx-secondary">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            className="w-full border border-mdlinx-secondary/30 px-4 py-3 text-mdlinx-body outline-none focus:border-mdlinx-teal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error ? <p className="text-sm text-mdlinx-red">{error}</p> : null}

        <Button type="submit" disabled={submitting || password.length === 0}>
          {submitting ? "Unlocking..." : "Unlock dashboard"}
        </Button>
      </form>
    </div>
  );
}

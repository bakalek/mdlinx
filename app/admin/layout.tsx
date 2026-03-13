import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="border border-dotted border-mdlinx-secondary/30 bg-white p-4 text-sm text-mdlinx-secondary">
        Admin auth is intentionally not finalized yet. This wrapper is where the chosen gate will land once you confirm
        whether you want a plain password screen or Vercel-backed protection.
      </div>
      {children}
    </div>
  );
}

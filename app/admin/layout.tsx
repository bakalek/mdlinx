import type { ReactNode } from "react";
import { cookies } from "next/headers";

import { AdminAccessForm } from "@/components/AdminAccessForm";
import { ADMIN_AUTH_COOKIE, isAdminPasswordSet, isValidAdminSession } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  const isAuthorized = isValidAdminSession(sessionValue);

  if (!isAdminPasswordSet()) {
    return (
      <div className="space-y-6">
        <div className="border border-dotted border-mdlinx-red/40 bg-white p-6 text-sm leading-7 text-mdlinx-secondary">
          Set `ADMIN_PASSWORD` in `.env.local` before using the admin dashboard.
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <AdminAccessForm />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border border-dotted border-mdlinx-secondary/30 bg-white p-4 text-sm text-mdlinx-secondary">
        <p>Private dashboard unlocked.</p>
        <form action="/api/admin/logout" method="post">
          <button className="font-semibold uppercase tracking-[0.14em] text-mdlinx-navy" type="submit">
            Log out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}

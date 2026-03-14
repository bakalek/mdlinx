import type { Metadata } from "next";
import Link from "next/link";

import "@/app/globals.css";
import { brand } from "@/lib/branding";

export const metadata: Metadata = {
  title: "MDLinx AI and Media Strategy Assessment",
  description: "A broader assessment of AI readiness, publishing pressure, audience strategy, and operating priorities at MDLinx.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 md:px-10">
          <header className="flex items-center justify-between border-b border-dotted border-mdlinx-secondary/30 pb-6">
            <Link href="/" className="flex items-center gap-3">
              <img src={brand.logoUrl} alt={`${brand.name} logo`} className="h-10 w-auto" />
            </Link>
            <nav className="hidden gap-6 text-sm text-mdlinx-secondary md:flex">
              <Link href="/quiz">Quiz</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </header>

          <main className="flex-1 py-10">{children}</main>

          <footer className="border-t border-dotted border-mdlinx-secondary/30 pt-5 text-sm text-mdlinx-muted">
            {brand.footer}
          </footer>
        </div>
      </body>
    </html>
  );
}

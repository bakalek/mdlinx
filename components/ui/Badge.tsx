import type { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex border border-dotted border-mdlinx-teal px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">
      {children}
    </span>
  );
}

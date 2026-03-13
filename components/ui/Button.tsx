import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
  }
>;

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const baseClassName =
    "inline-flex items-center justify-center border px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition";
  const variantClassName =
    variant === "primary"
      ? "border-mdlinx-teal bg-mdlinx-teal text-white hover:bg-mdlinx-navy hover:border-mdlinx-navy"
      : "border-mdlinx-navy bg-transparent text-mdlinx-navy hover:bg-mdlinx-light";

  return (
    <button className={`${baseClassName} ${variantClassName} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

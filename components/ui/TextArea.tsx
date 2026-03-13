import type { TextareaHTMLAttributes } from "react";

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="min-h-36 w-full border border-mdlinx-secondary/30 bg-white px-4 py-3 text-sm text-mdlinx-body outline-none transition focus:border-mdlinx-teal"
      {...props}
    />
  );
}

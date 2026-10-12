import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "text";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-sm transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-forest hover:bg-lime-strong",
  secondary: "bg-forest text-white hover:bg-forest-800",
  outline: "border border-forest/25 text-forest hover:border-forest hover:bg-forest/5",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
  text: "text-forest underline-offset-4 hover:underline px-0! min-h-0!",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-[0.9375rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, arrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" />}
    </Link>
  );
}

/** Inline text link with an arrow, used for "Explore solution" style links. */
export function ArrowLink({ className = "", children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group/link inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline-offset-4 hover:underline ${className}`}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
    </Link>
  );
}

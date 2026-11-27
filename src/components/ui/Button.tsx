import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "white" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  download?: boolean | string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-1 text-bg-2 hover:bg-brand-2 focus-visible:ring-2 focus-visible:ring-brand-2",
  white:
    "bg-white text-bg-2 hover:bg-brand-2 focus-visible:ring-2 focus-visible:ring-brand-1",
  outline:
    "border-2 border-brand-1 text-white hover:bg-brand-1/10 focus-visible:ring-2 focus-visible:ring-brand-1",
};

export function Button({
  variant = "primary",
  href,
  external = false,
  download,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3 text-base md:text-xl font-normal transition-colors duration-200 cursor-pointer focus:outline-none";
  const combined = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (external || download) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          download={download}
          className={combined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}


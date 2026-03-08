import React from "react";

type NavButtonProps = {
  active?: boolean;
  children: React.ReactNode;
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

export default function NavButton({
  active = false,
  children,
  className = "",
  ...props
}: NavButtonProps) {
  const base =
    "flex h-12 cursor-pointer items-center justify-center rounded-lg border-2 px-4 text-sm font-semibold transition-colors";
  const style = {
    backgroundColor: active ? "var(--near-black)" : "rgba(255,255,255,0.85)",
    borderColor: active ? "var(--near-black)" : "rgba(0,0,0,0.15)",
    color: active ? "#fff" : "var(--near-black)",
    textDecoration: "none" as const,
  };

  if ("href" in props && props.href) {
    return (
      <a
        className={`${base} ${className}`}
        style={style}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${base} ${className}`}
      style={style}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

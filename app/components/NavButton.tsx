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
    "flex h-12 cursor-pointer items-center justify-center px-4 text-sm font-semibold transition-colors gap-2";
  const style = {
    textDecoration: "none" as const,
  };

  if ("href" in props && props.href) {
    return (
      <a
        className={`${base} ${className}`}
        style={style}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <span
          className="size-4 bg-black"
          style={{
            background: active ? "var(--soft-pink)" : "var(--foreground)",
          }}
        />
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
      <span
        className="size-4 bg-black"
        style={{
          background: active ? "var(--soft-pink)" : "var(--foreground)",
        }}
      />
      {children}
    </button>
  );
}

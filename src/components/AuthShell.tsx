import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: Props) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[5fr_6fr]">
      <aside className="flex flex-col justify-between bg-accent px-6 py-8 text-accent-ink sm:px-16 lg:py-16">
        <p className="font-display text-7xl leading-none tracking-tight sm:text-8xl lg:text-9xl">
          auth<span className="opacity-60">_</span>
        </p>
        <p className="hidden max-w-xs text-lg leading-snug opacity-90 lg:block">
          Accounts, email verification and password reset, in one small Next.js
          app.
        </p>
      </aside>
      <section className="flex items-center px-6 py-12 sm:px-16">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-4xl tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <p className="mt-8 text-sm text-muted">{footer}</p>}
        </div>
      </section>
    </main>
  );
}

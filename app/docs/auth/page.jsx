import Link from "next/link";
import { ArrowLeft, ArrowRight, KeyRound } from "lucide-react";

export const metadata = {
  title: "Authentication Docs | SassyPack",
  description:
    "How authentication works in SassyPack: JWT and session auth, OAuth providers, protected routes, and setup steps.",
  alternates: {
    canonical: "https://sassypack.collabtower.com/docs/auth",
  },
};

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF7F4A] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FF7F4A]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]";
const cardClass = "rounded-lg border border-[#E5E7EB] bg-white shadow-sm";

const steps = [
  {
    title: "Choose your auth strategy",
    detail:
      "SassyPack ships with JWT and session-based authentication. Pick JWT for stateless APIs, or sessions if you want easier server-side revocation.",
  },
  {
    title: "Add OAuth providers",
    detail:
      "Google and GitHub sign-in are pre-wired. Add your provider credentials to your environment variables and the login buttons activate automatically.",
  },
  {
    title: "Protect your routes",
    detail:
      "Middleware checks the auth cookie before rendering protected pages, so dashboard and account routes are gated by default.",
  },
  {
    title: "Manage sessions",
    detail:
      "Tokens and sessions are issued through HttpOnly, Secure, SameSite cookies. Rotate refresh tokens or expire sessions from your server without touching the client.",
  },
];

export default function AuthDocsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 pb-20 pt-28 text-[#111827] lg:pt-36">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6366F1]">
          <ArrowLeft size={16} /> Home
        </Link>

        <header className={`${cardClass} p-6 md:p-10`}>
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#6366F1]">
            <KeyRound size={14} /> Docs
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Authentication
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
            How SassyPack handles sign-in, sessions, and protected routes out of the box.
          </p>
        </header>

        <section className="mt-6 grid gap-5">
          {steps.map((step, index) => (
            <div key={step.title} className={`${cardClass} p-6`}>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F8FAFC] text-sm font-semibold text-[#111827]">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold leading-tight">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#4B5563]">{step.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 flex flex-wrap gap-3">
          <Link href="/free-tools/auth-flow-visualizer" className={primaryButtonClass}>
            Visualize an auth flow <ArrowRight size={18} />
          </Link>
          <Link href="/saas-authentication-boilerplate" className={secondaryButtonClass}>
            Auth boilerplate details <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </main>
  );
}
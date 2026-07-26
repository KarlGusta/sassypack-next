import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { buildMetadata } from "@/lib/programmatic";

export async function generateMetadata() {
  return buildMetadata({
    title: "Live Dashboard Demo | SassyPack",
    description:
      "See the exact dashboard template included with SassyPack: stat cards, a revenue chart, and a customers table, ready to customize.",
    keywords: [
      "saas dashboard template",
      "saas admin dashboard demo",
      "next.js dashboard template",
      "saas starter kit dashboard",
    ],
    canonical: "https://sassypack.collabtower.com/demo",
  });
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Customers", icon: Users, active: false },
  { label: "Revenue", icon: CreditCard, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const stats = [
  { label: "MRR", value: "$48,231", delta: "+12.4%", up: true },
  { label: "Active Users", value: "2,847", delta: "+8.1%", up: true },
  { label: "Churn Rate", value: "2.1%", delta: "-0.4%", up: false },
  { label: "New Signups", value: "184", delta: "+22.3%", up: true },
];

const chartValues = [32, 48, 41, 58, 74, 92];
const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function buildChartPaths(values) {
  const width = 600;
  const step = width / (values.length - 1);
  const points = values.map((v, i) => {
    const x = Math.round(i * step);
    const y = Math.round(190 - v * 1.6);
    return { x, y };
  });
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${width},200 L0,200 Z`;
  return { line, area };
}

const { line: chartLine, area: chartArea } = buildChartPaths(chartValues);

const customers = [
  { name: "Maya Chen", plan: "Pro", status: "Active", joined: "Jan 14, 2026", color: "#6366F1" },
  { name: "Deshawn Ortiz", plan: "Team", status: "Trial", joined: "Feb 2, 2026", color: "#FF7F4A" },
  { name: "Priya Nair", plan: "Pro", status: "Active", joined: "Feb 9, 2026", color: "#111827" },
  { name: "Tomás Rivera", plan: "Starter", status: "Active", joined: "Mar 1, 2026", color: "#6366F1" },
  { name: "Elena Kowalski", plan: "Team", status: "Churned", joined: "Mar 18, 2026", color: "#FF7F4A" },
];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function statusStyle(status) {
  if (status === "Active") return "bg-[#ECFDF5] text-[#047857]";
  if (status === "Trial") return "bg-[#EEF2FF] text-[#4338CA]";
  return "bg-[#FEF2F2] text-[#B91C1C]";
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF6] px-4 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]">
            Dashboard template
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
            This Is the Dashboard You Get
          </h1>
          <p className="mt-4 text-lg leading-7 text-[#4B5563]">
            Not a screenshot from someone else's product. Stat cards, a revenue chart, and a
            customers table, all built and wired up before you write a single line.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFE711] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#FFE711]"
            >
              Get SassyPack <ArrowRight size={16} />
            </Link>
            <Link
              href="/live-demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#111827]"
            >
              Open full-screen demo
            </Link>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#F87171]" />
            <span className="h-3 w-3 rounded-full bg-[#FBBF24]" />
            <span className="h-3 w-3 rounded-full bg-[#34D399]" />
            <div className="ml-3 flex-1 truncate rounded-md border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#6B7280]">
              app.yourapp.com/dashboard
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <aside className="flex w-16 flex-shrink-0 flex-col justify-between bg-[#111827] p-3 md:w-56 md:p-5">
              <div>
                <p className="hidden text-lg font-semibold text-white md:block">Acme</p>
                <nav className="mt-2 space-y-1 md:mt-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition md:px-3 ${
                          item.active
                            ? "bg-white/10 text-[#FFE711]"
                            : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon size={18} className="flex-shrink-0" />
                        <span className="hidden md:inline">{item.label}</span>
                      </div>
                    );
                  })}
                </nav>
              </div>
              <div className="hidden items-center gap-2 rounded-md bg-white/5 px-3 py-2 md:flex">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6366F1] text-xs font-semibold text-white">
                  JD
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white">Jordan Diaz</p>
                  <p className="text-[11px] text-[#9CA3AF]">Pro plan</p>
                </div>
              </div>
            </aside>

            <div className="flex-1 bg-[#FDFCF6] p-4 sm:p-6 md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#9CA3AF] sm:w-64">
                  <Search size={15} />
                  Search customers
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111827] px-3 py-2 text-sm font-semibold text-white"
                >
                  <Plus size={15} />
                  Add customer
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-xl font-bold text-[#111827]">{stat.value}</p>
                    <p
                      className={`mt-1 flex items-center gap-1 text-xs font-semibold ${
                        stat.up ? "text-[#047857]" : "text-[#B91C1C]"
                      }`}
                    >
                      {stat.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {stat.delta}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-[#111827]">Revenue, last 6 months</h3>
                <svg viewBox="0 0 600 200" className="mt-4 h-40 w-full">
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={chartArea} fill="url(#revenueFill)" />
                  <path d={chartLine} fill="none" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-1 flex justify-between text-xs text-[#9CA3AF]">
                  {chartMonths.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm">
                <div className="border-b border-[#E5E7EB] px-5 py-4">
                  <h3 className="text-sm font-semibold text-[#111827]">Recent customers</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-[#9CA3AF]">
                        <th className="px-5 py-3 font-medium">Name</th>
                        <th className="px-5 py-3 font-medium">Plan</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.name} className="border-t border-[#F1F5F9]">
                          <td className="flex items-center gap-3 px-5 py-3">
                            <span
                              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                              style={{ backgroundColor: customer.color }}
                            >
                              {initials(customer.name)}
                            </span>
                            <span className="font-medium text-[#111827]">{customer.name}</span>
                          </td>
                          <td className="px-5 py-3 text-[#4B5563]">{customer.plan}</td>
                          <td className="px-5 py-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(
                                customer.status
                              )}`}
                            >
                              {customer.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[#4B5563]">{customer.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <Sparkles size={18} className="mt-0.5 flex-shrink-0 text-[#6366F1]" />
                <p className="text-sm text-[#4B5563]">
                  Every card, chart, and table row above is a real React component. Swap in your
                  data and it's yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

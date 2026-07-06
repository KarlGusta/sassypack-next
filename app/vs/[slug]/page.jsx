import Link from "next/link";
import { getEntry, getStaticParamsFor, buildMetadata } from "@/lib/programmatic";
import PageWrapper from "@/components/PageWrapper";

export async function generateStaticParams() {
  return getStaticParamsFor("comparisons");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getEntry("comparisons", slug);
  if (!entry) return {};
  return buildMetadata(entry.meta);
}

export default async function ComparisonPage({ params }) {
  const { slug } = await params;
  const entry = getEntry("comparisons", slug);

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#FDFCF6] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-black mb-6 text-[#111827]">Comparison not found</h1>
        <Link href="/" className="text-[#6366F1] font-bold hover:underline">Go Home</Link>
      </div>
    );
  }

  return <PageWrapper data={entry} />;
}

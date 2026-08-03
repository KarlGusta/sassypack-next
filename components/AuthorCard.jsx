import Image from "next/image";
import Link from "next/link";
import { author } from "@/data/author";
import { ExternalLink, Github, Linkedin } from "lucide-react";

function XIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.2 2.25h7.54l4.261 5.678L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

export default function AuthorCard({ variant = "full" }) {
  const isCompact = variant === "compact";

  return (
    <aside
      className={`rounded-lg border border-[#E5E7EB] bg-white shadow-sm ${
        isCompact ? "p-5" : "p-6 md:p-8"
      }`}
      aria-labelledby="author-heading"
    >
      <div className={`flex ${isCompact ? "items-center gap-4" : "flex-col gap-5 sm:flex-row sm:items-start"}`}>
        <div className="shrink-0">
          <Image
            src={author.image}
            alt={author.imageAlt}
            width={isCompact ? 56 : 80}
            height={isCompact ? 56 : 80}
            className="rounded-lg border border-[#E5E7EB] object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p
            id="author-heading"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6366F1]"
          >
            About the author
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#111827]">
            {author.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#4B5563]">{author.jobTitle}</p>

          {!isCompact && (
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">{author.bio}</p>
          )}

          {isCompact && (
            <p className="mt-2 text-sm leading-6 text-[#4B5563]">{author.shortBio}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={author.socials.twitter.url}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
              aria-label={`${author.name} on X`}
            >
              <XIcon size={14} />
              {author.socials.twitter.handle}
            </a>
            <a
              href={author.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
              aria-label={`${author.name} on LinkedIn`}
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a
              href={author.socials.github.url}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#4B5563] transition hover:border-[#CBD5E1] hover:bg-white hover:text-[#111827]"
              aria-label={`${author.name} on GitHub`}
            >
              <Github size={14} />
              {author.socials.github.handle}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

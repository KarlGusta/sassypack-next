"use client";

import { Twitter, Link as LinkIcon } from "lucide-react";

export default function ShareButtons({ title }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleShareX = () => {
    const introductoryMessage = "Just read this fantastic article! Check it out:";
    const fullShareText = `${introductoryMessage} ${title} by @esimitkarlgusta`;
    const text = encodeURIComponent(fullShareText);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
        Share
      </span>
      <button
        type="button"
        onClick={handleShareX}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-white transition hover:bg-[#1F2937]"
        aria-label="Share on X"
      >
        <Twitter size={18} />
      </button>
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DB] bg-white text-[#111827] transition hover:border-[#111827]"
        aria-label="Copy link"
      >
        <LinkIcon size={18} />
      </button>
    </div>
  );
}

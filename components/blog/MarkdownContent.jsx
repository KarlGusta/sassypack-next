import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    const isExternal = /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        {...props}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};

export default function MarkdownContent({ content }) {
  return (
    <div
      className="prose prose-lg max-w-none
      prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[#111827]
      prose-h2:mt-12 prose-h2:text-3xl
      prose-p:leading-8 prose-p:text-[#374151]
      prose-a:text-[#6366F1] prose-a:no-underline hover:prose-a:underline
      prose-strong:text-[#111827]
      prose-code:rounded prose-code:bg-[#F8FAFC] prose-code:px-1.5 prose-code:py-0.5
      prose-pre:rounded-lg prose-pre:border prose-pre:border-[#E5E7EB]
      prose-img:rounded-lg prose-img:border prose-img:border-[#E5E7EB]"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

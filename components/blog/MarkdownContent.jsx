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
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="overflow-x-auto rounded-lg border border-[#E5E7EB] bg-[#111827] p-4 text-[#F8FAFC]"
    >
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    // Fenced code blocks get a "language-xxx" className from remark; inline code doesn't.
    const isBlock = Boolean(className);

    if (isBlock) {
      return (
        <code {...props} className={`${className || ""} text-[#F8FAFC]`}>
          {children}
        </code>
      );
    }

    return (
      <code
        {...props}
        className="rounded bg-[#F8FAFC] px-1.5 py-0.5 text-[#111827]"
      >
        {children}
      </code>
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
      prose-img:rounded-lg prose-img:border prose-img:border-[#E5E7EB]"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

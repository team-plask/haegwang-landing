import ReactMarkdown, { Components } from "react-markdown";
import Link from "next/link";

export type PostContentSuccess = {
  result?: string;
  main_markdown_content?: string;
};

export type PostContentNewsOrBlog = {
  main_markdown_content?: string;
};

export type ParsedContent = 
  | ({ post_type: "업무사례" } & PostContentSuccess)
  | ({ post_type: "법인소식" } & PostContentNewsOrBlog)
  | ({ post_type: "블로그" } & PostContentNewsOrBlog);

// Define custom markdown renderers
const customMarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-6 mb-4 text-neutral-900 dark:text-white">
      {children}
    </h1>
  ),
  h2: ({ children, node }) => {
    const id = typeof node?.children?.[0] === 'object' && 'value' in node.children[0] && typeof node.children[0].value === 'string' 
               ? node.children[0].value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') 
               : undefined;
    return (
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2" id={id}>
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 text-neutral-800 dark:text-neutral-100 flex items-center">
      <span className="mr-2 text-brand">▎</span>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-neutral-900 dark:text-white">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-neutral-800 dark:text-neutral-200">
      {children}
    </em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-4 space-y-2 marker:text-brand">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 marker:text-brand">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-neutral-700 dark:text-neutral-300">
      {children}
    </li>
  ),
  a: ({ href, children }) => (
    <Link href={href || '#'} className="text-blue-600 dark:text-blue-400 hover:underline">
      {children}
    </Link>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand/30 dark:border-brand/40 pl-4 py-1 my-4 text-neutral-600 dark:text-neutral-400 italic bg-neutral-100/50 dark:bg-neutral-800/50 rounded-r">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200 text-sm">
      {children}
    </code>
  ),
  hr: () => (
    <hr className="my-8 border-t border-neutral-200 dark:border-neutral-800" />
  ),
};

interface BlogContentDisplayProps {
  parsedContent: ParsedContent;
}

export default function BlogContentDisplay({ parsedContent }: BlogContentDisplayProps) {
  let markdownToRender = "";
  if (parsedContent.post_type === "업무사례") {
    markdownToRender = parsedContent.main_markdown_content || "";
  } else if (parsedContent.post_type === "법인소식" || parsedContent.post_type === "블로그") {
    markdownToRender = parsedContent.main_markdown_content || "";
  }

  // Do not render the component if there's no specific content to show other than a potential result card
  if (!markdownToRender && !(parsedContent.post_type === "업무사례" && parsedContent.result)) {
      return <p className="text-neutral-600 dark:text-neutral-400">내용을 불러오는 중이거나, 표시할 내용이 없습니다.</p>;
  }

  return (
    <div className="flex flex-1 flex-col p-5 min-h-[800px]">
      <h3 className="mb-6 border-b border-neutral-200 pb-2 font-heading text-2xl font-semibold text-black dark:text-neutral-100">아티클 내용</h3>
      <article className="max-w-none">
        {/* Main content area with background and border */}
        {markdownToRender && (
          <div className="mb-8">
            <ReactMarkdown components={customMarkdownComponents}>
              {markdownToRender}
            </ReactMarkdown>
          </div>
        )}

        {/* Result Card for '업무사례' - moved to the bottom */}
        {parsedContent.post_type === '업무사례' && parsedContent.result && (
          <div className="rounded-xl  border border-brand/40 p-6">
            <div className="flex flex-col items-start gap-2">
              <div className="mr-4 flex items-center justify-center rounded-full gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-semibold text-brand/80 dark:text-brand-foreground mb-1">최종 결과</p>
              </div>
              <div>
                <p className="ml-4 font-bold text-xl text-brand dark:text-white">{parsedContent.result}</p>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
} 
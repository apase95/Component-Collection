import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { cn } from "../../libs/utils";


const getNodeText = (node: React.ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") return node.toString();
    if (Array.isArray(node)) return node.map(getNodeText).join("");
    if (React.isValidElement(node)) return getNodeText(node.props.children);
    return "";
};

export const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");


const CodeBlock = ({ language, code }: { language: string; code: string }) => {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="relative my-6 overflow-hidden rounded-lg border border-glass-border bg-[#1e1e1e] group">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <span className="text-xs font-mono text-slate-400">{language || "text"}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                    {isCopied ? (
                        <>
                            <FaCheck className="text-green-400" />
                            <span className="text-green-400">Copied</span>
                        </>
                    ) : (
                        <>
                            <FaCopy />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <SyntaxHighlighter
                PreTag="div"
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: "1.5rem",
                    background: "transparent",
                    fontSize: "0.875rem",
                    lineHeight: "1.7",
                    fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

interface MarkdownContentProps {
    content: string;
    className?: string;
}
export const MarkdownContent = ({ content, className }: MarkdownContentProps) => {
    return (
        <div className={cn("w-full max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    code({ children, className }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const codeString = String(children).replace(/\n$/, "");

                        if (match) {
                            return <CodeBlock language={match[1]} code={codeString} />;
                        }

                        return (
                            <code className="font-mono text-[85%] bg-[#6e768166] text-[#c9d1d9] px-1.5 py-0.5 rounded-md">
                                {children}
                            </code>
                        );
                    },

                    h1({ children }) {
                        const text = getNodeText(children);
                        return (
                            <h1
                                id={slugify(text)}
                                className="scroll-mt-24 text-3xl font-semibold text-white mt-10 mb-6 pb-2"
                            >
                                {children}
                            </h1>
                        );
                    },
                    h2({ children }) {
                        const text = getNodeText(children);
                        return (
                            <h2 
                                id={slugify(text)} 
                                className="scroll-mt-24 text-2xl font-semibold text-white mt-8 mb-4 pb-2"
                            >
                                {children}
                            </h2>
                        );
                    },
                    h3({ children }) {
                        const text = getNodeText(children);
                        return (
                            <h3 
                                id={slugify(text)} 
                                className="scroll-mt-24 text-xl font-semibold text-white mt-6 mb-3"
                            >
                                {children}
                            </h3>
                        );
                    },
                    h4({ children }) {
                        const text = getNodeText(children);
                        return (
                            <h4 
                                id={slugify(text)} 
                                className="scroll-mt-24 text-base font-semibold text-white mt-6 mb-3"
                            >
                                {children}
                            </h4>
                        );
                    },
                    p: ({ children }) => <p className="mb-4 text-[#c9d1d9]">{children}</p>,
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 pl-2 space-y-1">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 pl-2 space-y-1">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    a: ({ href, children }) => (
                        <a href={href} className="text-[#2f81f7] no-underline hover:underline font-medium">
                            {children}
                        </a>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote 
                            className="border-l-4 border-[#30363d] pl-4 text-[#8b949e] my-4"
                        >
                            {children}
                        </blockquote>
                    ),
                    img: ({ src, alt }) => {
                        const isBadge = 
                            src?.includes("shields.io") || 
                            src?.includes("img.shields.io") || 
                            src?.includes("badge") || 
                            src?.includes("github.com/actions") || 
                            (src?.includes("github.com") && src?.includes("/workflows/"));
                        if (isBadge) {
                            return (
                                <img 
                                    src={src} 
                                    alt={alt} 
                                    loading="lazy" 
                                    className="inline-block h-5 w-auto mr-1.5 align-middle select-none" 
                                />
                            );
                        }

                        return (
                            <div className="my-6">
                                <img 
                                    src={src} 
                                    alt={alt} 
                                    loading="lazy" 
                                    className="max-w-full h-auto rounded-md border border-[#30363d] bg-[#0d1117]" 
                                />
                                {alt && <p className="text-center text-xs text-slate-500 py-2 bg-black/20">{alt}</p>}
                            </div>
                        );
                    },
                    table: ({ children }) => (
                        <div className="my-4 w-full overflow-auto">
                            <table className="w-full border-collapse text-left border border-[#30363d] rounded-md overflow-hidden">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => <thead className="bg-[#161b22]">{children}</thead>,
                    tr: ({ children }) => <tr className="border-b border-[#30363d] even:bg-[#161b22] hover:bg-[#161b22]">{children}</tr>,
                    th: ({ children }) => <th className="px-3 py-2 border border-[#30363d] font-semibold text-white">{children}</th>,
                    td: ({ children }) => <td className="px-3 py-2 border border-[#30363d]">{children}</td>,
                    hr: () => <hr className="h-[0.25em] p-0 my-6 bg-[#30363d] border-0" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

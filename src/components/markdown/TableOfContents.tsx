import React from "react";
import { cn } from "../../libs/utils";
import { slugify } from "./MarkdownRenderer";

interface HeadingItem {
    level: number;
    text: string;
    id: string;
}

interface TableOfContentsProps {
    content: string;
    className?: string;
}

const extractHeadings = (markdown: string): HeadingItem[] => {
    if (!markdown) return [];

    const lines = markdown.split("\n");
    const headings: HeadingItem[] = [];
    const regex = /^(#{1,3})\s+(.*?)\s*#*$/;
    let insideCodeBlock = false;

    const slugCount = new Map<string, number>();

    const makeUniqueSlug = (text: string) => {
        const base = slugify(text);
        const count = slugCount.get(base) ?? 0;
        slugCount.set(base, count + 1);
        return count === 0 ? base : `${base}-${count}`;
    };

    for (const line of lines) {
        if (line.trim().startsWith("```")) {
            insideCodeBlock = !insideCodeBlock;
            continue;
        }
        if (insideCodeBlock) continue;

        const match = line.match(regex);
        if (!match) continue;

        const rawText = match[2].trim();
        const cleanText = rawText
            .replace(/(\*\*|__)(.*?)\1/g, "$2")
            .replace(/(\*|_)(.*?)\1/g, "$2")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/<[^>]*>/g, "")
            .trim();

        if (!cleanText) continue;

        headings.push({
            level: match[1].length,
            text: cleanText,
            id: makeUniqueSlug(cleanText),
        });
    }

    return headings;
};

export const TableOfContents = ({ content, className }: TableOfContentsProps) => {
    const [headings, setHeadings] = React.useState<HeadingItem[]>([]);
    const [activeId, setActiveId] = React.useState<string>("");

    React.useEffect(() => {
        setHeadings(extractHeadings(content));
    }, [content]);

    React.useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top -
                            b.boundingClientRect.top
                    );
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-96px 0px -70% 0px",
                threshold: [0, 1],
            }
        );
        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    const handleClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        
        const el = document.getElementById(id);
        if (!el) return;
        
        const yOffset = -96;
        const y =
            el.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });

        setActiveId(id);
    };

    return (
        <nav
            className={cn(
                "overflow-y-auto max-h-[calc(100vh-6rem)]",
                "text-sm",
                className
            )}
            aria-label="Table of contents"
        >
            <h4 className="font-semibold text-[#c9d1d9] mb-3 px-2">On this page</h4>
            <ul className="space-y-0.5 border-l-2 border-secondary-theme">
                {headings.map((h) => (
                    <li key={h.id}>
                        <a
                            href={`#${h.id}`}
                            onClick={(e) => handleClick(e, h.id)}
                            className={cn(
                                "block py-1.5 px-3 transition-colors border-l-2 -ml-0.5",
                                h.level === 3 && "pl-6",
                                activeId === h.id
                                    ? "text-white bg-primary-theme border-white font-medium"
                                    : "text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-300"
                            )}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

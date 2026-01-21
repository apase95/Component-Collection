import { useEffect, useState } from 'react'
import { TableOfContents } from '../markdown/TableOfContents';
import { MarkdownContent } from '../markdown/MarkdownRenderer';

export const MarkDownForm = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/javascript/guide/introduction/index.md")
            .then(res => res.text())
            .then(text => {
                setContent(text);
            });
    }, []);


    return (
        <div className="container-app section grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8 items-start">
            <main className="min-w-0">
                <div className="p-6 rounded-xl border border-glass-border bg-glass-surface backdrop-blur-md">
                     <h1 className="text-4xl font-bold text-white mb-6">Title Of Blogs</h1>
                     
                     <MarkdownContent content={content} />
                </div>
            </main>

            <aside className="hidden xl:block">
                <TableOfContents content={content} />
            </aside>
        </div>
    );
};

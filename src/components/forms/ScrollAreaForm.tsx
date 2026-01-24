import { 
    ScrollArea, ScrollHeader, ScrollViewport, ScrollContent 
} from "../overlay/ScrollArea";
import { cn } from "../../libs/utils";
import { Typography } from "../base/Typography";

const tags = Array.from({ length: 30 }).map((_, i) => `v1.2.0-beta.${50 - i}`);


export const ScrollAreaForm = () => {
    return (
                            
        <ScrollArea className="h-100 w-72 my-12 rounded-xl border border-white/10 bg-[#18181b] shadow-2xl">
            <ScrollHeader className="px-5 py-4 border-b border-white/5">
                <Typography variant="h3">Tags</Typography>
            </ScrollHeader>

            <ScrollViewport>
                <ScrollContent className="p-2">
                    {tags.map((tag, index) => (
                        <button
                            key={index}
                            className={cn(
                                "w-full text-left px-3 py-3 rounded-md text-sm text-slate-400",
                                "transition-colors duration-200",
                                "hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none",
                                "border-b border-white/5 last:border-0"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </ScrollContent>
            </ScrollViewport>
        </ScrollArea>
    );
};

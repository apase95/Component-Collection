import React from "react";
import { cn } from "../../libs/utils";
import { CgCodeSlash, CgEye, CgCheck, CgCopy } from "react-icons/cg";


type ViewMode = "preview" | "code";
interface ShowcaseContextType {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  code: string;
}
const ShowcaseContext = React.createContext<ShowcaseContextType | undefined>(undefined);
const useShowcase = () => {
  const cxt = React.useContext(ShowcaseContext);
  if (!cxt) {
    throw new Error("Showcase components must be used within <ComponentShowcase />");
  }
  return cxt;
};


interface ComponentShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  mode?: ViewMode;
  onModeChange?: (mode: ViewMode) => void;
}
const ComponentShowcase = React.forwardRef<
    HTMLDivElement, 
    ComponentShowcaseProps
>(({ 
    className, 
    code, 
    mode: controlledMode, 
    onModeChange, 
    children, 
    ...props 
}, ref) => {
    
    const [uncontrolledMode, setUncontrolledMode] = React.useState<ViewMode>("preview");
    const isControlled = controlledMode !== undefined;
    const mode = isControlled ? controlledMode : uncontrolledMode;
    const setMode = isControlled ? onModeChange! : setUncontrolledMode;

    return (
        <ShowcaseContext.Provider value={{ mode, setMode, code }}>
            <div
                ref={ref}
                className={cn(
                    "group relative w-full flex flex-col overflow-hidden rounded-xl",
                    "bg-primary-theme border border-secondary-theme shadow-sm",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </ShowcaseContext.Provider>
    );
});
ComponentShowcase.displayName = "ComponentShowcase";


const ShowcaseHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ 
    className, 
    children, 
    ...props 
}, ref) => (

    <div
        ref={ref}
        className={cn(
            "flex-between px-4 py-3",
            "border-b border-secondary-theme",
            "bg-white/5 backdrop-blur-sm", 
            className
        )}
        {...props}
    >
        {children}
    </div>
));
ShowcaseHeader.displayName = "ShowcaseHeader";


const ShowcaseTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <div className="flex flex-col space-y-1">
        <h3
            ref={ref}
            className={cn("text-sm font-semibold text-white", className)}
            {...props}
        />
    </div>
));
ShowcaseTitle.displayName = "ShowcaseTitle";


const ShowcaseDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-xs text-slate-400", className)}
        {...props}
    />
));
ShowcaseDescription.displayName = "ShowcaseDescription";


const ShowcaseToolbar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    
    const { mode, setMode, code } = useShowcase();
    const [copied, setCopied] = React.useState(false);
    const handleCopy = async () => {
        try {
            if (!navigator.clipboard) {
                throw new Error("Clipboard API not supported");
            }
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.warn("Copy failed:", error);
            setCopied(false);
        }
    };
    const baseBtn = 
        "p-2 text-slate-400 rounded-md transition-colors"
        + "hover:bg-white/10 hover:text-white !cursor-pointer" 
        + "focus:outline-none focus:ring-2 focus:ring-secondary-theme";
    const activeBtn = "bg-primary-theme text-slate-200 shadow-sm ring-1 ring-white/10 cursor-pointer";

    return (
        <div 
            ref={ref} 
            role="tablist"
            className={cn("flex items-center gap-1", className)} 
            {...props}
        >
            <button
                role="tab"
                aria-selected={mode === "preview"}
                aria-label="Preview component" 
                onClick={() => setMode("preview")}
                className={cn(baseBtn, mode === "preview" && activeBtn)}
            >
                <CgEye className="h-6 w-6 cursor-pointer" />
            </button>

            <button
                role="tab"
                aria-selected={mode === "code"}
                aria-label="View source code"
                onClick={() => setMode("code")}
                className={cn(baseBtn, mode === "code" && activeBtn)}
            >
                <CgCodeSlash className="h-6 w-6 cursor-pointer" />
            </button>

            <div className="mx-2 h-8 w-px bg-secondary-theme" />

            <button
                aria-label="Copy code"
                onClick={handleCopy}
                className={baseBtn}
            >
                {copied ? (
                    <CgCheck className="h-6 w-6 text-slate-200 cursor-pointer" />
                ) : (
                    <CgCopy className="h-6 w-6 cursor-pointer" />
                )}
            </button>
        </div>
    );
});
ShowcaseToolbar.displayName = "ShowcaseToolbar";


const ShowcasePreview = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  
    const { mode } = useShowcase();
    if (mode !== "preview") return null;

    return (
        <div
            ref={ref}
            className={cn(
                "relative min-h-87.5 w-full flex-center p-10",
                "bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size:16px_16px", 
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
ShowcasePreview.displayName = "ShowcasePreview";


const ShowcaseCode = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    
    const { mode, code } = useShowcase();
    if (mode !== "code") return null;

    return (
        <div
            ref={ref}
            className={cn(
                "w-full min-h-87.5 p-4 overflow-x-auto bg-slate-950",
                className
            )}
            {...props}
        >
            <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                <code>{children || code}</code>
            </pre>
        </div>
    );
});
ShowcaseCode.displayName = "ShowcaseCode";


export {
    ComponentShowcase,
    ShowcaseHeader,
    ShowcaseTitle,
    ShowcaseDescription,
    ShowcaseToolbar,
    ShowcasePreview,
    ShowcaseCode,
};
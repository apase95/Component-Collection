import React from "react";
import { cn } from "../../libs/utils";


interface TooltipContextType {
    id: string;
    open: boolean;
    show: () => void;
    hide: () => void;
};
const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);
const useTooltip = () => {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) {
    throw new Error("Tooltip components must be used inside <Tooltip />");
  }
  return ctx;
};


interface TooltipProps {
    children: React.ReactNode;
    delayDuration?: number;
};
const Tooltip = ({
    children,
    delayDuration = 300
}: TooltipProps) => {
    
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef<number | null>(null);
    const id = React.useId();
    
    const show = () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setOpen(true), delayDuration);
    };

    const hide = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setOpen(false);
    };

    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [])

    return (
        <TooltipContext.Provider value={{ open, show, hide, id }}>
            <div className="relative inline-block w-fit">
                {children}
            </div>
        </TooltipContext.Provider>
    );
};


const TooltipTrigger = React.forwardRef<
    HTMLSpanElement, 
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
    
    const { show, hide, open, id } = useTooltip();

    return (
        <div
            ref={ref}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            aria-describedby={open ? id : undefined}
            className={cn("flex-col", className)}
            {...props}
        />
    );
});
TooltipTrigger.displayName = "TooltipTrigger";


type Side = "top" | "bottom" | "left" | "right";
interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: Side;
    sideOffset?: number;
}
const TooltipContent = React.forwardRef<
    HTMLDivElement, 
    TooltipContentProps
>(({ className, side = "top", sideOffset = 8, children, ...props }, ref) => {
    
    const { open, id } = useTooltip();
    if (!open) return null;

    const positions: Record<Side, string> = {
        top: `bottom-full left-1/2 -translate-x-1/2 mb-[${sideOffset}px]`,
        bottom: `top-full left-1/2 -translate-x-1/2 mt-[${sideOffset}px]`,
        left: `right-full top-1/2 -translate-y-1/2 mr-[${sideOffset}px]`,
        right: `left-full top-1/2 -translate-y-1/2 ml-[${sideOffset}px]`,
    };

    const animations: Record<Side, string> = {
        top: "animate-in fade-in slide-in-from-bottom-2",
        bottom: "animate-in fade-in slide-in-from-top-2",
        left: "animate-in fade-in slide-in-from-right-2",
        right: "animate-in fade-in slide-in-from-left-2",
    };

    return (
        <div
            ref={ref}
            id={id}
            role="tooltip"
            className={cn(
                "absolute z-50 rounded-md", 
                "px-2 py-2 text-sm text-white font-medium",
                "bg-primary-theme shadow-xl",
                "border border-secondary-theme",
                positions[side],
                animations[side],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
TooltipContent.displayName = "TooltipContent";


export { Tooltip, TooltipTrigger, TooltipContent };
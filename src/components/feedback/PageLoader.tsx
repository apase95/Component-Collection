import React from "react";
import { cn } from "../../libs/utils";
import { Spinner, type SpinnerProps } from "./Spinner";


export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    fullscreen?: boolean;
    lockScroll?: boolean;
    blur?: boolean;
    message?: React.ReactNode;
    spinnerSize?: SpinnerProps["size"];
    spinnerVariant?: SpinnerProps["variant"];
};

export const PageLoader = React.forwardRef<
    HTMLDivElement, 
    PageLoaderProps
>(({
    fullscreen = true,
    lockScroll = fullscreen,
    blur = true,
    message,
    spinnerSize = "lg",
    spinnerVariant = "default",
    children,
    className,
    ...props
}, ref) => {

    React.useEffect(() => {
        if (!lockScroll) return;

        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = original;
        };
    }, [lockScroll]);

    return (
        <div
            ref={ref}
            role="status"
            aria-busy="true"
            aria-live="polite"
            className={cn(
                "flex-center flex-col z-50",
                "bg-slate-900/60 transition-all duration-300",
                "animate-in fade-in duration-200",
                "pointer-events-auto",
                fullscreen ? "fixed inset-0" : "absolute inset-0",
                blur && "backdrop-blur-sm",
                className
            )}
            {...props}
        >
            <div className="flex flex-col items-center gap-4 p-4 rounded-xl">
                <Spinner size={spinnerSize} variant={spinnerVariant} />
                
                {(message || children) && (
                    <div className="text-sm font-medium text-slate-300 tracking-wide animate-pulse">
                        {message || children}
                    </div>
                )}
            </div>
        </div>
    );
});
import * as React from "react";
import { cn } from "../../libs/utils";


type ProgressSize = "sm" | "md" | "lg";
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    size?: ProgressSize;
    indicatorClassName?: string;
}
const SIZE_MAP: Record<ProgressSize, string> = {
    sm: "h-1",
    md: "h-1.5",
    lg: "h-2",
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
({ 
    className, 
    value = 0, 
    max = 100, 
    size = "md", 
    indicatorClassName,
    ...props 
}, ref) => {
        
    const percentage = React.useMemo(() => {
        const safeMax = max > 0 ? max : 100;
        const safeValue = value ?? 0;
        const percent = (safeValue / safeMax) * 100;
        return Math.min(Math.max(percent, 0), 100);
    }, [value, max]);

    return (
        <div
            ref={ref}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={value}
            className={cn(
                "relative w-full overflow-hidden rounded-full bg-slate-700/60",
                SIZE_MAP[size],
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "h-full w-full flex-1 bg-white transition-all duration-300 ease-out",
                    indicatorClassName
                )}
                style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
        </div>
    );
});

Progress.displayName = "Progress";
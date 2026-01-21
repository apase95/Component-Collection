import React from "react";
import { cn } from "../../libs/utils";


type SwitchSize = "sm" | "md" | "lg";
interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: SwitchSize;
}

const Switch = React.forwardRef<
    HTMLButtonElement, 
    SwitchProps
>(({ 
    className, 
    checked = false, 
    onCheckedChange, 
    size = "md", 
    disabled, 
    onClick, 
    ...props 
}, ref) => {
        
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        onCheckedChange?.(!checked);
        onClick?.(e);
    };

    const sizes = {
        sm: {
            track: "h-5 w-9",
            thumb: "h-3 w-3",
            offset: "translate-x-4",
        },
        md: {
            track: "h-6 w-11",
            thumb: "h-4 w-4",
            offset: "translate-x-5",
        },
        lg: {
            track: "h-7 w-14",
            thumb: "h-5 w-5",
            offset: "translate-x-7",
        },
    };

    return (
        <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={handleClick}
            className={cn(
                "relative inline-flex shrink-0 items-center cursor-pointer",
                "rounded-full transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                checked
                    ? "bg-primary"
                    : "bg-slate-700 hover:bg-slate-600",
                disabled && "opacity-50 cursor-not-allowed",
                sizes[size].track,
                className
            )}
            {...props}
        >
            <span
                className={cn(
                    "pointer-events-none absolute left-1 top-1/2",
                    "rounded-full bg-white shadow-md",
                    "transition-transform duration-200 ease-in-out",
                    "-translate-y-1/2",
                    sizes[size].thumb,
                    checked ? sizes[size].offset : "translate-x-0"
                )}
            />
        </button>
    );
});
Switch.displayName = "Switch";


export { Switch };
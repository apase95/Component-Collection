import React from "react";
import { CgSpinner } from "react-icons/cg";
import { cn } from "../../libs/utils";

type ButtonVariant = "primary" | "secondary" | "glass" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<
    HTMLButtonElement, 
    ButtonProps
>(({
    className,
    variant = "primary",
    size = "md",
    isLoading,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
}, ref) => {
  
    const baseStyle = 
        "flex-center flex-row font-medium rounded-md transition-colors" 
        + "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20" 
        + "disabled:pointer-events-none disabled:opacity-50 cursor-pointer"; 
    
    const variants = {
        primary: "bg-primary-theme border border-secondary-theme text-slate-200 shadow-sm hover:bg-secondary-theme hover:text-white",        
        secondary: "bg-black text-white border border-white hover:bg-white hover:text-black",
        glass: "bg-glass-surface text-white backdrop-blur-md border border-glass-border hover:bg-glass-highlight shadow-sm",
        ghost: "bg-transparent text-slate-300 hover:bg-secondary-theme hover:text-white",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
    };

    const sizes = {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-9 px-4 text-sm gap-2",
        lg: "h-10 px-6 text-base gap-2.5",
        icon: "h-9 w-9 p-0",
    };

    const iconSize = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        icon: "text-lg",
    };

    const content = size === "icon"
        ? (isLoading 
            ? <CgSpinner className="animate-spin text-current" /> 
            : (leftIcon ?? children))
        : (
            <>
                {isLoading && <CgSpinner className={cn("animate-spin text-current", iconSize[size])} />}
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
            </>
        );
    
    return (
        <button
            ref={ref}
            className={cn(baseStyle, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {content}
        </button>
    );
});

Button.displayName = "Button";
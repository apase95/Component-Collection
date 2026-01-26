import React from "react";
import { cn } from "../../libs/utils";


export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "xs" | "sm" | "md" | "lg";
    variant?: "default" | "primary" | "white";
}

const sizeClasses = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
};

const variantClasses = {
    default: "text-white",
    primary: "text-primary",
    white: "text-white",
};

export const Spinner = React.forwardRef<
    HTMLDivElement,
    SpinnerProps
>(({ 
    size = "md", 
    variant = "default", 
    className, 
    ...props 
}, ref) => {
    return (
        <div
            ref={ref}
            role="status"
            aria-label="Loading"
            className={cn(
                "flex-center flex animate-spin",
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-full w-full"
            >
                <circle 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    strokeDasharray="40 100" 
                />
            </svg>
        </div>
    );
});

Spinner.displayName = "Spinner";

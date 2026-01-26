import React from "react";
import { cn } from "../../libs/utils";

const Card = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col w-full",
            "rounded-xl border text-slate-200 shadow-sm",
            "bg-primary-theme border-secondary-theme",
            "transition-colors",
            className
        )}
        {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col space-y-1.5 p-6",
            className
        )}
        {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "font-semibold leading-none tracking-tight text-white text-xl",
            className
        )}
        {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "p-6 pt-0",
            className
        )}
        {...props}
  />
));
CardContent.displayName = "CardContent";

const CardDescription = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "p-6 pt-0",
            className
        )}
        {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardFooter = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center p-6 pt-0",
            className
        )}
        {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
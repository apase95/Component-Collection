import React from "react";
import { cn } from "../../libs/utils";


const Footer = React.forwardRef<
    HTMLElement, 
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <footer
        ref={ref}
        className={cn(
            "w-full border-t border-glass-border bg-black/20 backdrop-blur-lg pt-12 pb-8",
            "text-slate-400",
            className
        )}
        {...props}
  />
));
Footer.displayName = "Footer";


const FooterContainer = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "container-app",
            className
        )}
        {...props}
  />
));
FooterContainer.displayName = "FooterContainer";


const FooterGrid = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12",
            className
        )}
        {...props}
  />
));
FooterGrid.displayName = "FooterGrid";


const FooterColumn = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col gap-4",
            className
        )}
        {...props}
  />
));
FooterColumn.displayName = "FooterColumn";


const FooterTitle = React.forwardRef<
    HTMLHeadingElement, 
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h4
        ref={ref}
        className={cn(
            "text-sm font-semibold text-white uppercase tracking-wider",
            className
        )}
        {...props}
  />
));
FooterTitle.displayName = "FooterTitle";


const FooterLink = React.forwardRef<
    HTMLAnchorElement, 
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
    <a
        ref={ref}
        className={cn(
            "text-sm decoration-accent/30 underline-offset-4",
            "cursor-pointer hover:text-accent hover:underline transition-all",
            className
        )}
        {...props}
  />
));
FooterLink.displayName = "FooterLink";


const FooterBottom = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex-center flex-col md:flex-row gap-4 pt-8 border-t border-glass-border",
            className
        )}
        {...props}
  />
));
FooterBottom.displayName = "FooterBottom";


export { Footer, FooterContainer, FooterGrid, FooterColumn, FooterTitle, FooterLink, FooterBottom };
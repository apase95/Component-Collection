import React from "react";
import { cn } from "../../libs/utils";


const AppBar = React.forwardRef<
    HTMLElement, 
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <header
        ref={ref}
        className={cn(
            "sticky top-0 z-50 w-full",
            "border-b border-secondary-theme",
            "bg-primary-theme backdrop-blur-xl",
            "transition-all duration-300",
            className
        )}
        {...props}
  />
));
AppBar.displayName = "AppBar";


const AppBarContainer = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "w-full h-16 flex-center gap-4",
            className
        )}
        {...props}
  />
));
AppBarContainer.displayName = "AppBarContainer";


const AppBarBrand = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center gap-2 text-lg font-bold tracking-tight text-white",
            className
        )}
        {...props}
  />
));
AppBarBrand.displayName = "AppBarBrand";


const AppBarNav = React.forwardRef<
    HTMLElement, 
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <nav
        ref={ref}
        className={cn(
            "hidden md:flex items-center gap-6",
            className
        )}
        {...props}
  />
));
AppBarNav.displayName = "AppBarNav";


interface AppBarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>{
    active?: boolean;
};
const AppBarLink = React.forwardRef<
    HTMLAnchorElement, 
    AppBarLinkProps
>(({ className, active, ...props }, ref) => (
    <a
        ref={ref}
        className={cn(
            "text-sm font-medium transition-colors hover:text-white cursor-pointer",
            active ? "text-white" : "text-slate-400",
            className
        )}
        {...props}
  />
));
AppBarLink.displayName = "AppBarLink";


const AppBarActions = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center gap-3",
            className
        )}
        {...props}
  />
));
AppBarActions.displayName = "AppBarActions";

export { 
  AppBar, 
  AppBarContainer, 
  AppBarBrand, 
  AppBarNav, 
  AppBarLink, 
  AppBarActions 
};
import React from "react";
import { cn } from "../../libs/utils";
import { CgChevronLeft, CgChevronRight, CgMoreAlt } from "react-icons/cg";


interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    isActive?: boolean;
    size?: "default" | "sm" | "icon";
}
const Pagination = React.forwardRef<
    HTMLElement, 
    React.ComponentProps<"nav">
>(({ className, ...props }, ref) => (
    
    <nav
        ref={ref}
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
));
Pagination.displayName = "Pagination";


const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    
    <ul
        ref={ref}
        className={cn(
            "flex flex-row items-center gap-1", 
            className
        )}
        {...props}
    />
));
PaginationContent.displayName = "PaginationContent";


const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    
    <li 
        ref={ref} 
        className={cn(
            "", 
            className
        )} 
        {...props} 
    />
));
PaginationItem.displayName = "PaginationItem";


const PaginationLink = React.forwardRef<
    HTMLAnchorElement,
    PaginationLinkProps
>(({ 
    className, 
    isActive, 
    size = "default", 
    ...props 
}, ref) => (
    
    <a
        ref={ref}
        aria-current={isActive ? "page" : undefined}
        className={cn(
            "flex-center whitespace-nowrap rounded-md",
            "text-sm font-medium border border-transparent",
            "transition-colors cursor-pointer select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
            size === "default" && "h-9 px-4 py-2",
            size === "sm" && "h-8 px-3",
            size === "icon" && "h-9 w-9",
            isActive 
                ? "bg-[#18181b] text-white border-white/10 shadow-sm" 
                : "text-slate-400 hover:bg-[#18181b] hover:text-white hover:border-white/10",    
            className
        )}
        {...props}
    />
));
PaginationLink.displayName = "PaginationLink";


const PaginationPrevious = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentProps<typeof PaginationLink>
>(({ className, ...props }, ref) => (
    
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn(
            "gap-1 pl-2.5", 
            className
        )}
        ref={ref}
        {...props}
    >
        <CgChevronLeft className="h-4 w-4" />
        <span>Previous</span>
    </PaginationLink>
));
PaginationPrevious.displayName = "PaginationPrevious";


const PaginationNext = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentProps<typeof PaginationLink>
>(({ className, ...props }, ref) => (
    
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn(
            "gap-1 pr-2.5", 
            className
        )}
        ref={ref}
        {...props}
    >
        <span>Next</span>
        <CgChevronRight className="h-4 w-4" />
    </PaginationLink>
));
PaginationNext.displayName = "PaginationNext";


const PaginationEllipsis = React.forwardRef<
    HTMLSpanElement,
    React.ComponentProps<"span">
>(({ className, ...props }, ref) => (
    
    <span
        ref={ref}
        aria-hidden
        className={cn(
            "w-9 h-9 flex-center text-slate-400",
            className
        )}
        {...props}
    >
        <CgMoreAlt className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";


export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
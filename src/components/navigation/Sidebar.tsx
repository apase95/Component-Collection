import React from "react";
import { cn } from "../../libs/utils";
import { Button } from "../base/Button";
import { CgSidebar, CgSidebarRight } from "react-icons/cg";


interface SidebarContextType {
    expanded: boolean;
    setExpanded: (value: boolean) => void;
    toggle: () => void;
    isMobile: boolean;
    setMobileOpen: (value: boolean) => void;
    mobileOpen: boolean;
};
const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);
const useSidebar = () => {
    const ctx = React.useContext(SidebarContext);
    if (!ctx) {
        throw new Error("Sidebar components must be used within <SidebarProvider />");
    }
    return ctx;
};


interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultExpanded?: boolean;
}
const SidebarProvider = ({
    children,
    defaultExpanded = true,
    className,
    ...props
}: SidebarProviderProps) => {

    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)");
        const handleChange = () => setIsMobile(media.matches);
        handleChange();
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    React.useEffect(() => {
        if (isMobile) setExpanded(false);
        else setMobileOpen(false);
    }, [isMobile]);

    const toggle = React.useCallback(() => {
        if (isMobile) setMobileOpen(prev => !prev);
        else setExpanded(prev => !prev);
    }, [isMobile]);

    return (
        <SidebarContext.Provider
            value={{
                expanded,
                setExpanded,
                toggle,
                isMobile,
                mobileOpen,
                setMobileOpen
            }}
        >
            <div 
                className={cn(
                    "flex min-h-screen w-full", 
                    className
                )} 
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    );
};


const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {

    const { expanded, isMobile, mobileOpen, setMobileOpen } = useSidebar();
    if (isMobile) {
        return (
            <>
                {mobileOpen && (
                    <div 
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        role="button"
                        aria-label="Close sidebar"
                        tabIndex={0}
                        onClick={() => setMobileOpen(false)}
                        onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
                    />
                )}
                <aside
                    ref={ref}
                    role="navigation"
                    aria-expanded={mobileOpen}
                    className={cn(
                        "fixed top-0 left-0 z-50 h-screen w-64",
                        "bg-primary-theme border-r border-secondary-theme",
                        "transition-transform duration-300 ease-in-out",
                        mobileOpen ? "translate-x-0" : "-translate-x-full",
                        className
                    )}
                    {...props}
                >
                    {children}
                </aside>
            </>
        )
    }

    return (
        <aside
            ref={ref}
            role="navigation"
            aria-expanded={expanded}
            data-expanded={expanded}
            className={cn(
                "sticky top-0 z-30 h-screen",
                "border-r border-secondary-theme bg-primary-theme",
                "transition-all duration-300 ease-in-out",
                expanded ? "w-64" : "w-18",
                className
            )}
            {...props}
        >
            <div className="flex h-full flex-col overflow-hidden">
                {children}
            </div>
        </aside>
    );
});
Sidebar.displayName = "Sidebar";


const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ 
    className, 
    children, 
    ...props 
}, ref) => {

    const { expanded } = useSidebar();
    
    return (
        <div
            ref={ref}
            className={cn(
                "h-16 flex items-center px-4 overflow-hidden",
                "border-b border-secondary-theme transition-all",
                expanded ? "justify-start" : "justify-center",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
SidebarHeader.displayName = "SidebarHeader";


const SidebarContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex-1 overflow-y-auto py-4",
            "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]", 
            className
        )}
        {...props}
    />
));
SidebarContent.displayName = "SidebarContent";


interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    active?: boolean;
}
const SidebarItem = React.forwardRef<
    HTMLButtonElement, 
    SidebarItemProps
>(({ 
    className, 
    icon, 
    children, 
    active, 
    ...props 
}, ref) => {
        
    const { expanded } = useSidebar();

    return (
        <button
            ref={ref}
            className={cn(
                "group flex w-full min-h-10 items-center gap-3 rounded-md",
                "px-3 py-2 text-sm font-medium transition-colors mx-auto",
                active 
                    ? "bg-white/10 text:white" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                expanded 
                    ? "px-3 gap-3 w-[92%] mb-1 justify-start" 
                    : "px-0 w-10 h-10 mb-2 justify-center",
                className
            )}
            title={!expanded && typeof children === 'string' ? children : undefined}
            {...props}
        >
            {icon && (
                <span className={cn(
                    "flex-center text-xl shrink-0", 
                    active ? "text-white" : "text-slate-400 group-hover:text-white"
                )}>
                    {icon}
                </span>
            )}
            <span className={cn(
                "whitespace-nowrap transition-all duration-200 origin-left",
                expanded 
                    ? "w-auto opacity-100 translate-x-0" 
                    : "w-0 opacity-0 -translate-x-2 overflow-hidden hidden"
            )}>
                {children}
            </span>
        </button>
    );
});
SidebarItem.displayName = "SidebarItem";


const SidebarFooter = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ 
    className, 
    children, 
    ...props 
}, ref) => {
    
    const { expanded } = useSidebar();
    
    return (
        <div
            ref={ref}
            className={cn(
                "mt-auto border-t border-secondary-theme p-4 overflow-hidden",
                !expanded && "flex justify-center px-2", 
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
SidebarFooter.displayName = "SidebarFooter";


const SidebarTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    
    const { toggle, expanded } = useSidebar();

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            aria-label="Toggle sidebar"
            aria-expanded={expanded}
            onClick={toggle}
            className={cn("text-slate-400", className)}
            {...props}
        >
            {expanded ? <CgSidebarRight size={20} /> : <CgSidebar size={20} />}
        </Button>
    );
});
SidebarTrigger.displayName = "SidebarTrigger";


export {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarItem,
    SidebarFooter,
    SidebarTrigger,
};
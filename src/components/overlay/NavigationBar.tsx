import React from "react";
import { cn } from "../../libs/utils";


interface NavigationContextType {
    activeValue: string | null;
    setActiveValue: (value: string | null) => void;
}
const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);
const useNavigation = () => {
    const context = React.useContext(NavigationContext);
    if (!context) throw new Error("Navigation components must be used within <NavigationMenu />");
    return context;
};


const NavigationMenu = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ 
    className, 
    children, 
    ...props 
}, ref) => {
    
    const [activeValue, setActiveValue] = React.useState<string | null>(null);

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("[data-nav-root]")) {
                setActiveValue(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <NavigationContext.Provider value={{ activeValue, setActiveValue }}>
            <nav
                ref={ref}
                data-nav-root
                className={cn(
                    "relative z-10 flex-center flex-1 max-w-max",
                    className
                )}
                {...props}
            >
                {children}
            </nav>
        </NavigationContext.Provider>
    );
});
NavigationMenu.displayName = "NavigationMenu";


const NavigationMenuList = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn(
            "group flex-center flex-1 space-x-1 p-1",
            "list-none",
            "bg-[#18181b] rounded-md border border-white/10",
            className
        )}
        {...props}
    />
));
NavigationMenuList.displayName = "NavigationMenuList";


interface NavigationMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    value?: string;
}
const NavigationMenuItem = React.forwardRef<
    HTMLLIElement, 
    NavigationMenuItemProps
>(({ 
    className, 
    value, 
    children, 
    ...props 
}, ref) => {
    
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(
                child, 
                { menuValue: value }
            );
        }
        return child;
    });

    return (
        <li
            ref={ref}
            data-value={value}
            className={cn("relative", className)}
            {...props}
        >
            {childrenWithProps}
        </li>
    );
});
NavigationMenuItem.displayName = "NavigationMenuItem";


interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    menuValue?: string;
}
const NavigationMenuTrigger = React.forwardRef<
    HTMLButtonElement,
    NavigationMenuTriggerProps
>(({ 
    className, 
    children, 
    menuValue, 
    onClick, 
    ...props 
}, ref) => {
    
    const { activeValue, setActiveValue } = useNavigation();
    const isOpen = activeValue === menuValue;

    return (
        <button
            ref={ref}
            data-state={isOpen ? "open" : "closed"}
            className={cn(
                "group flex-center flex-col h-9 w-max rounded-md px-4 py-2", 
                "text-sm font-medium transition-colors",
                "text-slate-400 hover:bg-white/5 hover:text-white",
                "focus:bg-white/5 focus:text-white focus:outline-none",
                "data-[state=open]:bg-white/10 data-[state=open]:text-white",
                className
            )}
            onMouseEnter={() => {
                if (menuValue) setActiveValue(menuValue);
            }}
            onClick={(e) => {
                setActiveValue(isOpen ? null : menuValue!);
                onClick?.(e);
            }}
            {...props}
        >
            {children}
        </button>
    );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";


interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    menuValue?: string;
}

const NavigationMenuContent = React.forwardRef<
    HTMLDivElement,
    NavigationMenuContentProps
>(({ className, menuValue, ...props }, ref) => {
    
    const { activeValue } = useNavigation();
    if (activeValue !== menuValue) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "absolute left-0 top-full mt-2 p-1 w-auto min-w-50 origin-top-left",
                "bg-[#18181b] rounded-md border border-white/10 shadow-2xl",
                "animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200",
                className
            )}
            {...props}
        />
    );
});
NavigationMenuContent.displayName = "NavigationMenuContent";


const NavigationMenuLink = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => {
    return (
        <a
            ref={ref}
            className={cn(
                "group flex-center flex-col h-9 w-max rounded-md px-4 py-2", 
                "text-sm font-medium transition-colors",
                "text-slate-400 hover:bg-white/5 hover:text-white",
                "focus:bg-white/5 focus:text-white focus:outline-none",
                className
            )}
            {...props}
        />
    );
});
NavigationMenuLink.displayName = "NavigationMenuLink";


export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
};
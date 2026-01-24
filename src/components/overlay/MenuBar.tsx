import React from "react";
import { cn } from "../../libs/utils";
import { FaCheck } from "react-icons/fa";


interface MenuBarContextType {
    activeMenu: string | null;
    setActiveMenu: (value: string | null) => void;
}
const MenuBarContext = React.createContext<MenuBarContextType | undefined>(undefined);
const useMenuBar = () => {
    const context = React.useContext(MenuBarContext);
    if (!context) throw new Error("MenuBar components must be used within <MenuBar />");
    return context;
};


const MenuBar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("[data-menubar-root]")) {
                setActiveMenu(null);
            }
        };
        if (activeMenu) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => document.removeEventListener("click", handleClickOutside);
    }, [activeMenu]);

    return (
        <MenuBarContext.Provider value={{ activeMenu, setActiveMenu }}>
            <div
                ref={ref}
                role="menubar"
                data-menubar-root
                className={cn(
                    "flex h-10 items-center space-x-1 rounded-md",
                    "border border-white/10 bg-[#18181b] p-1",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </MenuBarContext.Provider>
    );
});
MenuBar.displayName = "MenuBar";


interface MenuBarMenuProps {
    value: string;
    children: React.ReactNode;
}
const MenuBarMenu = ({ value, children }: MenuBarMenuProps) => {
    return (
        <div className="relative" data-value={value}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(
                        child, 
                        { menuValue: value }
                    );
                }
                return child;
            })}
        </div>
    );
};


interface MenuBarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    menuValue?: string;
}
const MenuBarTrigger = React.forwardRef<
    HTMLButtonElement, 
    MenuBarTriggerProps
>(({ 
    className, 
    menuValue, 
    onClick, 
    onMouseEnter, 
    ...props 
}, ref) => {
        
    const { activeMenu, setActiveMenu } = useMenuBar();
    const isOpen = activeMenu === menuValue;

    return (
        <button
            ref={ref}
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={isOpen}
            data-state={isOpen ? "open" : "closed"}
            className={cn(
                "flex items-center rounded-sm px-3 py-1.5",
                "cursor-default select-none",
                "text-sm font-medium outline-none transition-colors",
                "text-slate-400 hover:bg-white/5 hover:text-white",
                "focus:bg-white/5 focus:text-white",
                "data-[state=open]:bg-white/10 data-[state=open]:text-white",
                className
            )}
            onClick={(e) => {
                setActiveMenu(isOpen ? null : menuValue!);
                onClick?.(e);
            }}
            onMouseEnter={(e) => {
                if (activeMenu && activeMenu !== menuValue) {
                    setActiveMenu(menuValue!);
                }
                onMouseEnter?.(e);
            }}
            {...props}
        />
    );
});
MenuBarTrigger.displayName = "MenuBarTrigger";


interface MenuBarContentProps extends React.HTMLAttributes<HTMLDivElement> {
    menuValue?: string;
}
const MenuBarContent = React.forwardRef<
    HTMLDivElement, 
    MenuBarContentProps
>(({ className, menuValue, ...props }, ref) => {
        
    const { activeMenu } = useMenuBar();
    if (activeMenu !== menuValue) return null;

    return (
        <div
            ref={ref}
            role="menu"
            className={cn(
                "absolute left-0 top-full z-50 mt-1 min-w-48 overflow-hidden",
                "rounded-md border border-white/10 bg-[#18181b] p-1 shadow-2xl",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                className
            )}
            {...props}
        >
            {props.children}
        </div>
    );
});
MenuBarContent.displayName = "MenuBarContent";


const MenuBarItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & 
    { 
        inset?: boolean 
        disabled?: boolean
    }
>(({ 
    className, 
    inset,
    disabled,
    ...props 
}, ref) => {

    const { setActiveMenu } = useMenuBar();

    return (
        <div
            ref={ref}
            role="menuitem"
            aria-disabled={disabled}
            data-disabled={disabled ? "" : undefined}
            className={cn(
                "relative flex items-center rounded-sm",
                "px-2 py-1.5 text-sm text-slate-300",
                "outline-none transition-colors cursor-pointer select-none",
                "hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
                "data-disabled:pointer-events-none data-disabled:opacity-50",
                inset && "pl-8",
                className
            )}
            onClick={(e) => {
                if (!props["aria-disabled"]) {
                    setActiveMenu(null);
                    props.onClick?.(e);
                }
            }}
            {...props}
        />
    );
});
MenuBarItem.displayName = "MenuBarItem";


interface MenuBarCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
const MenuBarCheckboxItem = React.forwardRef<
    HTMLDivElement,
    MenuBarCheckboxItemProps
>(({ 
    className, 
    children, 
    checked = false, 
    onCheckedChange, 
    ...props 
}, ref) => {

    return (
        <div
            ref={ref}
            role="menuitemcheckbox"
            aria-checked={checked}
            tabIndex={0}
            className={cn(
                "relative flex items-center rounded-sm",
                "py-1.5 pl-8 pr-2 text-sm text-slate-300",
                "hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
                "cursor-pointer select-none outline-none transition-colors",
                "data-disabled:pointer-events-none data-disabled:opacity-50",
                className
            )}
            onClick={(e) => {
                onCheckedChange?.(!checked);
                props.onClick?.(e);
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onCheckedChange?.(!checked);
                }
            }}
            {...props}
        >
            <span className="absolute h-3.5 w-3.5 left-2 flex-center">
                {checked && <FaCheck className="h-3 w-3 text-white" />}
            </span>
            {children}
        </div>
    );
});
MenuBarCheckboxItem.displayName = "MenuBarCheckboxItem";


const MenuBarSeparator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (

    <div
        ref={ref}
        role="separator"
        className={cn("-mx-1 my-1 h-px bg-white/10", className)}
        {...props}
    />
));
MenuBarSeparator.displayName = "MenuBarSeparator";


const MenuBarLabel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (

    <div
        ref={ref}
        className={cn(
            "px-2 py-1.5 text-xs font-semibold text-slate-500",
            inset && "pl-8",
            className
        )}
        {...props}
    />
));
MenuBarLabel.displayName = "MenuBarLabel";


const MenuBarShortcut = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                "ml-auto text-xs tracking-widest text-slate-500",
                className
            )}
            {...props}
        />
    );
};
MenuBarShortcut.displayName = "MenuBarShortcut";


export {
    MenuBar,
    MenuBarMenu,
    MenuBarTrigger,
    MenuBarContent,
    MenuBarItem,
    MenuBarCheckboxItem,
    MenuBarSeparator,
    MenuBarLabel,
    MenuBarShortcut,
};
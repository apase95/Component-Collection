import React from "react";
import { cn } from "../../libs/utils";


interface DropdownContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    toggleOpen: () => void;
};
const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);
const useDropdown = () => {
    const ctx = React.useContext(DropdownContext);
    if (!ctx) {
        throw new Error("Dropdown components must be used inside <DropdownMenu />");
    }
    return ctx;
};


const DropdownMenu = ({
    children,
}: { children: React.ReactNode }) => {
    
    const [open, setOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const toggleOpen = () => setOpen((prev) => !prev);
    
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open])

    return (
        <DropdownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div 
                ref={menuRef}
                className="relative inline-block text-left"
            >
                {children}
            </div>
        </DropdownContext.Provider>
    );
};


const DropdownMenuTrigger = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    
    const { toggleOpen, open } = useDropdown();

    return (
        <div
            ref={ref}
            onClick={toggleOpen}
            aria-haspopup="menu"
            aria-expanded={open}
            className={cn("cursor-pointer inline-flex", className)}
            {...props}
        >
            {children}
        </div>
    );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";


type Align = "start" | "end" | "center";
interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement>{
    align?: Align;
    sideOffset?: number;
};
const DropdownMenuContent = React.forwardRef<
    HTMLDivElement, 
    DropdownMenuContentProps
>(({ 
    className, 
    align = "center", 
    sideOffset = 4, 
    children, 
    ...props 
}, ref) => {
    
    const { open } = useDropdown();
    if (!open) return null;

    const alignments: Record<Align, string> = {
        center: "left-1/2 -translate-x-1/2",
        start: "left-0",
        end: "right-0",
    };

    return (
        <div
            ref={ref}
            role="menu"
            className={cn(
                "absolute z-50 min-w-32 overflow-hidden rounded-md", 
                "mt-2 p-1", 
                "bg-primary-theme text-slate-300",
                "border border-secondary-theme shadow-md backdrop-blur-md",
                "animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200",
                alignments[align],
                className
            )}
            style={{ marginTop: sideOffset}}
            {...props}
        >
            {children}
        </div>
    );
});
DropdownMenuContent.displayName = "DropdownMenuContent";


interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
}
const DropdownMenuItem = React.forwardRef<
    HTMLDivElement, 
    DropdownMenuItemProps
>(({ className, disabled, onClick, ...props }, ref) => {
    
    const { setOpen } = useDropdown();

    return (
        <div
            ref={ref}
            role="menuitem"
            onClick={(e) => {
                if (disabled) return;
                onClick?.(e);
                setOpen(false);
            }}
            className={cn(
                "relative flex items-center rounded-sm ",
                "p-2 text-sm",
                "cursor-pointer select-none outline-none",
                "hover:bg-secondary-theme hover:text-white", 
                "focus:bg-secondary-theme focus:text-white",
                "transition-colors",
                disabled && "pointer-events-none opacity-50",
                className
            )}
            {...props}
        />
    );
});
DropdownMenuItem.displayName = "DropdownMenuItem";


const DropdownMenuLabel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "px-2 py-1.5 text-sm font-semibold text-slate-300", 
            className
        )}
        {...props}
    />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";


const DropdownMenuSeparator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "-mx-1 my-1 h-px bg-secondary-theme", 
            className
        )}
        {...props}
    />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";


export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
};
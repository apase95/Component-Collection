import * as React from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { cn } from "../../libs/utils";


interface SelectContextValue {
    value: string | undefined;
    onValueChange: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    labelMap: Map<string, React.ReactNode>; 
    registerItem: (value: string, label: React.ReactNode) => void;
}
const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);
const useSelect = () => {
    const cxt = React.useContext(SelectContext);
    if (!cxt) throw new Error("Select components must be used within <Select />");
    return cxt;
};


interface SelectProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
const Select = ({ 
    value: controlledValue, 
    defaultValue, 
    onValueChange, 
    open: controlledOpen,
    onOpenChange,
    children 
}: SelectProps) => {

    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const [labelMap, setLabelMap] = React.useState<Map<string, React.ReactNode>>(new Map());
    const value = controlledValue ?? uncontrolledValue;
    const open = controlledOpen ?? uncontrolledOpen;

    const registerItem = React.useCallback((itemValue: string, label: React.ReactNode) => {
        setLabelMap((prev) => {
            if (prev.get(itemValue) === label) return prev;
            const newMap = new Map(prev);
            newMap.set(itemValue, label);
            return newMap;
        });
    },[]);

    const setOpen = React.useCallback((nextOpen: boolean) => {
        if (onOpenChange) onOpenChange(nextOpen);
        else setUncontrolledOpen(nextOpen);
    },[onOpenChange]);

    const handleValueChange = React.useCallback((newValue: string) => {
        if (onValueChange) onValueChange(newValue);
        else setUncontrolledValue(newValue);
        setOpen(false);
    }, [onValueChange, setOpen]);

    React.useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("[data-select-root]")) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [open, setOpen]);

    return (
        <SelectContext.Provider
            value={{
                value,
                onValueChange: handleValueChange,
                open,
                setOpen,
                labelMap,
                registerItem,
            }}
        >
            <div
                className="relative inline-block w-full"
                data-select-root
            >
                {children}
            </div>
        </SelectContext.Provider>
  );
};


const SelectTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ 
    className, 
    children, 
    ...props 
}, ref) => {
    
    const { open, setOpen } = useSelect();

    return (
        <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
                "w-full h-10 flex-between rounded-md",
                "px-4 py-2 text-sm",
                "bg-[#18181b] border border-white/10 text-slate-200 shadow-sm",
                "hover:bg-white/5 hover:border-white/20 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            onClick={() => setOpen(!open)}
            {...props}
        >
            {children}
            <FaChevronDown className="h-3 w-3 opacity-50 ml-2" />
        </button>
    );
});
SelectTrigger.displayName = "SelectTrigger";


interface SelectValueProps {
    placeholder?: string;
}
const SelectValue = ({ placeholder }: SelectValueProps) => {
    
    const { value, labelMap } = useSelect();
    const label = value ? labelMap.get(value) : null;
    
    return (
        <span className="block truncate">
            {label ?? (
                <span className="text-slate-500">
                    {placeholder}
                </span>
            )}
        </span>
    );
};


const SelectContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ 
    className, 
    children, 
    ...props 
}, ref) => {

    const { open } = useSelect();
    if (!open) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 top-[calc(100%+4px)] w-full min-w-32 overflow-hidden rounded-md",
                "p-1 bg-[#18181b] border border-white/10 shadow-2xl",
                "animate-in fade-in zoom-in-95 duration-100",
                className
            )}
            {...props}
        >
            <div className="max-h-75 overflow-y-auto overflow-x-hidden custom-scrollbar">
                {children}
            </div>
        </div>
    );
});
SelectContent.displayName = "SelectContent";


interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
}
const SelectItem = React.forwardRef<
    HTMLDivElement, 
    SelectItemProps
>(({ 
    className, 
    children, 
    value: itemValue, 
    disabled, 
    ...props 
}, ref) => {

    const { value, onValueChange, registerItem } = useSelect();
    const isSelected = value === itemValue;
    React.useEffect(() => {
        registerItem(itemValue, children);
    }, [itemValue, children, registerItem]);

    return (
        <div
            ref={ref}
            role="option"
            aria-selected={isSelected}
            data-disabled={disabled}
            className={cn(
                "relative w-full flex items-center rounded-sm",
                "py-1.5 pl-4 pr-2 text-sm text-slate-300", 
                "outline-none cursor-pointer select-none",
                "hover:bg-white/10 hover:text-white", 
                "focus:bg-white/10 focus:text-white",
                "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                className
            )}
            onClick={() => {
                if (!disabled) onValueChange(itemValue);
            }}
            {...props}
        >
            <span className="absolute left-2 flex-center h-3.5 w-3.5 text-white">
                {isSelected && <FaCheck className="h-3 w-3" />}
            </span>            
            <span className="truncate">{children}</span>
        </div>
    );
});
SelectItem.displayName = "SelectItem";


const SelectLabel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "py-1.5 pl-4 pr-2", 
            "text-xs font-semibold text-slate-500", 
            className
        )}
        {...props}
    />
));
SelectLabel.displayName = "SelectLabel";


const SelectSeparator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "-mx-1 my-1 h-px bg-white/10", 
            className
        )}
        {...props}
    />
));
SelectSeparator.displayName = "SelectSeparator";


export {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectSeparator,
};
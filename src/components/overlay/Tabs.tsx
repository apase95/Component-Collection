import * as React from "react";
import { cn } from "../../libs/utils";


type TabsOrientation = "horizontal" | "vertical";
interface TabsContextValue {
    value: string;
    onValueChange: (value: string) => void;
    orientation: TabsOrientation;
}
const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);
const useTabs = () => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("Tabs components must be used within <Tabs />");
    return context;
};


interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    value?: string;
    defaultValue: string;
    onValueChange?: (value: string) => void;
    orientation?: TabsOrientation;
}
const Tabs = React.forwardRef<
    HTMLDivElement, 
    TabsProps
>(({ 
    className, 
    value: controlledValue, 
    defaultValue, 
    onValueChange, 
    orientation = "horizontal",
    children, 
    ...props 
}, ref) => {

    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = React.useCallback((newValue: string) => {
        if (!isControlled) setInternalValue(newValue);
        onValueChange?.(newValue);
    }, [isControlled, onValueChange]);

    return (
        <TabsContext.Provider value={{ value, onValueChange: handleValueChange, orientation }}>
            <div
                ref={ref}
                data-orientation={orientation}
                className={cn(
                    "flex w-full",
                    orientation === "vertical" ? "flex-row gap-4" : "flex-col gap-2",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
});
Tabs.displayName = "Tabs";


const TabsList = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { orientation } = useTabs();

    return (
        <div
            ref={ref}
            role="tablist"
            aria-orientation={orientation}
            className={cn(
                "inline-flex items-center justify-center rounded-md p-1",
                "text-slate-400 bg-[#18181b] border border-white/10",
                orientation === "vertical" ? "flex-col h-fit w-auto" : "h-10 w-full",
                className
            )}
            {...props}
        />
    );
});
TabsList.displayName = "TabsList";


interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}
const TabsTrigger = React.forwardRef<
    HTMLButtonElement, 
    TabsTriggerProps
>(({ 
    className, 
    value: triggerValue, 
    onClick, 
    ...props
}, ref) => {

    const { value, onValueChange, orientation } = useTabs();
    const isActive = value === triggerValue;

    return (
        <button
            ref={ref}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${triggerValue}`}
            data-state={isActive ? "active" : "inactive"}
            data-orientation={orientation}
            tabIndex={isActive ? 0 : -1}
            className={cn(
                "flex-center flex-col whitespace-nowrap rounded-sm",
                "px-3 py-1.5 text-sm font-medium", 
                "ring-offset-background transition-all", 
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", 
                "disabled:pointer-events-none disabled:opacity-50",
                "data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm",
                "text-slate-400 hover:text-white hover:bg-white/5",
                orientation === "vertical" ? "w-full justify-start" : "flex-1",
                className
            )}
            onClick={(e) => {
                onValueChange(triggerValue);
                onClick?.(e);
            }}
            {...props}
        />
    );
});
TabsTrigger.displayName = "TabsTrigger";


interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}
const TabsContent = React.forwardRef<
    HTMLDivElement, 
    TabsContentProps
>(({ 
    className, 
    value: contentValue, 
    ...props 
}, ref) => {

    const { value } = useTabs();
    if (value !== contentValue) return null;

    return (
        <div
            ref={ref}
            role="tabpanel"
            id={`tabpanel-${contentValue}`}
            tabIndex={0}
            className={cn(
                "mt-2 ring-offset-background", 
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2",
                "animate-in fade-in zoom-in-95 duration-200",
                className
            )}
            {...props}
        />
    );
});
TabsContent.displayName = "TabsContent";


export { Tabs, TabsList, TabsTrigger, TabsContent };
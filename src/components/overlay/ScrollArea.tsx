import React from "react";
import { cn } from "../../libs/utils";


type ScrollOrientation = "vertical" | "horizontal" | "both";
interface ScrollAreaContextValue {
    orientation: ScrollOrientation;
}
const ScrollAreaContext = React.createContext<ScrollAreaContextValue>({
    orientation: "vertical",
});


interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: ScrollOrientation;
}
const ScrollArea = React.forwardRef<
    HTMLDivElement,
    ScrollAreaProps
>(({ 
    className, 
    children,
    orientation = "vertical",  
    ...props 
}, ref) => {

    return (
        <ScrollAreaContext.Provider value={{ orientation }}>
            <div
                ref={ref}
                className={cn(
                    "relative flex overflow-hidden",
                    orientation === "vertical"
                        ? "flex-col"
                        : "flex-row",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </ScrollAreaContext.Provider>
    );
});
ScrollArea.displayName = "ScrollArea";


const ScrollHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (

    <div
        ref={ref}
        className={cn(
            "shrink-0 z-10 bg-inherit", 
            className
        )} 
        {...props}
    />
));
ScrollHeader.displayName = "ScrollHeader";


const ScrollViewport = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {

    const { orientation } = React.useContext(ScrollAreaContext);

    return (
        <div
            ref={ref}
            data-orientation={orientation}
            className={cn(
                "relative flex-1 w-full min-h-0",
                orientation === "vertical" && "overflow-y-auto overflow-x-hidden",
                orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
                orientation === "both" && "overflow-auto",
                "[&::-webkit-scrollbar]:w-2",
                "[&::-webkit-scrollbar]:h-2",                
                "[&::-webkit-scrollbar-track]:bg-transparent",                
                "[&::-webkit-scrollbar-thumb]:bg-slate-600/40",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "[&::-webkit-scrollbar-thumb]:border-2",
                "[&::-webkit-scrollbar-thumb]:border-solid",
                "[&::-webkit-scrollbar-thumb]:border-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-clip-content",                
                "[&::-webkit-scrollbar-thumb]:hover:bg-slate-500/80",                
                "scrollbar-thin scrollbar-color-slate-600/40 transparent",
                className
            )}
            tabIndex={0}
            {...props}
        >
            {children}
        </div>
    );
});
ScrollViewport.displayName = "ScrollViewport";


const ScrollContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    
    <div
        ref={ref}
        className={cn(
            "min-w-full block", 
            className
        )}
        {...props}
    >
        {children}
    </div>
));
ScrollContent.displayName = "ScrollContent";


const Scrollbar = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    
    return null; 
});
Scrollbar.displayName = "Scrollbar";


export { 
    ScrollArea, 
    ScrollHeader, 
    ScrollViewport, 
    ScrollContent, 
    Scrollbar 
};
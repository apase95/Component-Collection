import React, { useState } from "react";
import { cn } from "../../libs/utils";

type AvatarSize = "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarShape = "circle" | "square";
interface AvatarContextValue {
    size: AvatarSize;
    shape: AvatarShape;
}
const AvatarContext = React.createContext<AvatarContextValue>({
    size: "md",
    shape: "circle",
});
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: AvatarSize;
    shape?: AvatarShape;
}


const Avatar = React.forwardRef<
    HTMLDivElement, 
    AvatarProps
>(({ className, size = "md", shape = "circle", ...props }, ref) => {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-14 w-14",
        xl: "h-24 w-24",
        "2xl": "h-32 w-32",
    };

    return (
        <AvatarContext.Provider value={{ size, shape }}>
            <div
                ref={ref}
                className={cn(
                    "relative flex shrink-0 overflow-visible",
                    sizeClasses[size],
                    className,
                )}
                {...props}
            >
                <div className={cn(
                    "flex h-full w-full bg-primary-theme overflow-hidden shadow-sm ring-1 ring-white/10",
                    shape === "circle" ? "rounded-full" : "rounded-xl",
                )}>
                    {props.children}
                </div>
            </div>
        </AvatarContext.Provider>
    );
});
Avatar.displayName = "Avatar";


const AvatarImage = React.forwardRef<
    HTMLImageElement, 
    React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, alt, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    if (hasError || !src) return null;

    return (
        <img
            ref={ref}
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className={cn("aspect-square h-full w-full object-cover", className)}
            {...props}
        />
    );
});
AvatarImage.displayName = "AvatarImage";


const AvatarFallback = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { size } = React.useContext(AvatarContext);

    const textSize = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg",
        xl: "text-3xl",
        "2xl": "text-4xl",
    };

    return (
        <div
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center bg-slate-800 text-slate-400 font-semibold",
                "animate-in fade-in duration-300",
                textSize[size],
                className,
            )}
            {...props}
        />
    );
});
AvatarFallback.displayName = "AvatarFallback";


interface AvatarBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "online" | "offline" | "busy" | "away";
}
const AvatarBadge = React.forwardRef<
    HTMLDivElement,
    AvatarBadgeProps
>(({ className, status = "online", ...props }, ref) => {
    const { shape } = React.useContext(AvatarContext);
    
    const colors = {
        online: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]",
        offline: "bg-slate-500",
        busy: "bg-red-500",
        away: "bg-yellow-500",
    };

    const position = shape === "circle"
        ? "bottom-0 right-0"
        : "bottom-[-2px] right-[-2px]";

    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-10 block h-[25%] w-[25%] rounded-full ring-2 ring-slate-950",
                position,
                colors[status],
                className
            )}
            {...props}
        />
    );
});
AvatarBadge.displayName = "AvatarBadge";


const AvatarGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center -space-x-3", 
            "hover:space-x-1 transition-all duration-300", 
            className
        )}
        {...props}
    >
        {children}
  </div>
));
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup };
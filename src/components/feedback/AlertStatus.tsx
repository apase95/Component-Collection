import React from "react";
import { cn } from "../../libs/utils";
import { CgCheckO, CgDanger, CgInfo } from "react-icons/cg"; 
import { CiWarning } from "react-icons/ci";


type AlertVariant = "default" | "success" | "error" | "warning" | "info";


interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    icon?: boolean;
}
const Alert = React.forwardRef<
    HTMLDivElement, 
    AlertProps
>(({ className, variant = "default", icon = true, children, ...props }, ref) => {
    
    const variants: Record<AlertVariant, string> = {
        default: "bg-glass-surface border-glass-border text-slate-200",
        success: "bg-green-500/15 border-green-500/20 text-green-400",
        error:   "bg-red-500/15 border-red-500/20 text-red-400",      
        warning: "bg-yellow-500/15 border-yellow-500/20 text-yellow-400",
        info:    "bg-blue-500/15 border-blue-500/20 text-blue-400",
    };
    const icons: Record<AlertVariant, React.ReactNode> = {
        default: <CgInfo className="h-5 w-5" />,
        success: <CgCheckO className="h-5 w-5" />,
        error:   <CgDanger className="h-5 w-5" />,
        warning: <CiWarning className="h-5 w-5" />,
        info:    <CgInfo className="h-5 w-5" />,
    };

    return (
        <div
            ref={ref}
            role="alert"
            className={cn(
                "relative w-full rounded-lg border p-4",
                "flex items-start gap-3",
                "backdrop-blur-sm transition-all duration-200",
                variants[variant],
                className
            )}
            {...props}
        >
            {icon && (
                <div className="shrink-0 mt-0.5">
                    {icons[variant]}
                </div>
            )}            
            <div className="flex-1 space-y-1">
                {children}
            </div>
        </div>
    );
  }
);
Alert.displayName = "Alert";


const AlertTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn(
            "mb-1 font-semibold leading-none tracking-tight", 
            className
        )}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";


const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn(
            "text-sm opacity-90 leading-relaxed", 
            className
        )}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";


export { Alert, AlertTitle, AlertDescription };
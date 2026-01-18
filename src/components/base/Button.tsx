import { CgSpinner } from "react-icons/cg";
import { cn } from "../../libs/utils";

type ButtonVariant = "primary" | "secondary" | "glass" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

export const Button = ({
    className,
    variant = "primary",
    size = "md",
    isLoading,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
}: ButtonProps) => {
  
    const baseStyle = "flex-center font-medium rounded-lg interactive interactive-focus disabled-interactive"; 
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-dark disabled:hover:bg-primary",
        secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary",
        glass: "bg-glass-surface text-white backdrop-blur-md border border-glass-border hover:bg-glass-highlight hover:border-white/30 shadow-lg shadow-black/10",
        ghost: "bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
    };
    const sizes = {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2.5",
        icon: "h-10 w-10 p-0",
    };
    const iconSize = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        icon: "text-lg",
    };
    const content =
        size === "icon"
            ? leftIcon ?? children
            : (
                <>
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
                </>
            );
    
    return (
        <button
            className={cn(baseStyle, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <CgSpinner className={cn("animate-spin text-current", iconSize[size])} />
                ) : (
                content
            )}
        </button>
    );
}

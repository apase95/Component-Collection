import * as React from "react";
import { cn } from "../../libs/utils";


interface PasswordContextType {
    isVisible: boolean;
    toggle: () => void;
}
const PasswordContext = React.createContext<PasswordContextType | undefined>(undefined);
const usePassword = () => {
    const context = React.useContext(PasswordContext);
    if (!context) {
        throw new Error("PasswordToggleField components must be used within <PasswordToggleField />");
    }
    return context;
};


const PasswordToggleField = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggle = React.useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    return (
        <PasswordContext.Provider value={{ isVisible, toggle }}>
            <div
                ref={ref}
                className={cn(
                    "w-full h-12 flex items-center space-x-1 rounded-md",
                    "px-3 py-1 bg-[#18181b] border border-white/10",
                    "focus-within:ring-2 focus-within:ring-white/20 focus-within:border-white/20",
                    "transition-colors",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </PasswordContext.Provider>
    );
});
PasswordToggleField.displayName = "PasswordToggleField";


const PasswordToggleFieldInput = React.forwardRef<
    HTMLInputElement,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(({ className, ...props }, ref) => {

    const { isVisible } = usePassword();

    return (
        <input
            ref={ref}
            type={isVisible ? "text" : "password"}
            className={cn(
                "flex-1 bg-transparent",
                "text-lg text-slate-200 placeholder:text-slate-500",
                "outline-none border-none shadow-none",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
});
PasswordToggleFieldInput.displayName = "PasswordToggleFieldInput";


const PasswordToggleFieldToggle = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ 
    className, 
    children, 
    onClick, 
    ...props 
}, ref) => {
    
    const { toggle, isVisible } = usePassword();

    return (
        <button
            ref={ref}
            type="button"
            onClick={(e) => {
                toggle();
                onClick?.(e);
            }}
            className={cn(
                "flex-center h-full aspect-square rounded-sm",
                "text-slate-400 hover:text-white transition-colors",
                "focus:outline-none focus:text-white",
                className
            )}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            {...props}
        >
            {children}
        </button>
    );
});
PasswordToggleFieldToggle.displayName = "PasswordToggleFieldToggle";


interface PasswordToggleFieldIconProps {
    visible: React.ReactNode;
    hidden: React.ReactNode;
}
const PasswordToggleFieldIcon = ({
    visible,
    hidden,
}: PasswordToggleFieldIconProps) => {
    const { isVisible } = usePassword();
    return <>{isVisible ? visible : hidden}</>;
};
PasswordToggleFieldIcon.displayName = "PasswordToggleFieldIcon";


export {
    PasswordToggleField,
    PasswordToggleFieldInput,
    PasswordToggleFieldToggle,
    PasswordToggleFieldIcon,
};
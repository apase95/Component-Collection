import * as React from "react";
import { cn } from "../../libs/utils";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    wrapperClassName?: string;
    icon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, wrapperClassName, label, error, icon, id: idProp,...props }, ref) => {
        const generatedId = React.useId();
        const id = idProp ?? generatedId;
        
        return (
            <div className={cn("w-full space-y-1.5", wrapperClassName)}>
                {label && <label htmlFor={id}>{label}</label>}

                <div className="relative group">
                    {icon && (
                        <div className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2",
                            "text-slate-500 group-focus-within:text-accent transition-colors"
                        )}>
                            {icon}
                        </div>
                    )}

                    <input
                        id={id}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={cn(
                            "flex h-10 w-full rounded-md px-3 py-2 text-sm",
                            "bg-[#18181b] border border-white/10 text-slate-200 placeholder:text-slate-500",
                            "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-10" : "",
                            error && "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/50",
                            className
                        )}
                        {...props}
                    />
                </div>

                {error && (
                    <p id={`${id}-error`} className="text-xs text-red-400 font-medium">
                        {error}
                    </p>
                )}
            </div>
        )
    }
);
Input.displayName = "Input";
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
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 
                            text-slate-500 group-focus-within:text-accent transition-colors"
                        >
                            {icon}
                        </div>
                    )}

                    <input
                        id={id}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={cn(
                            "w-full flex h-10 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500",
                            "interactive-focus focus:border-accent interactive",
                            props.disabled && "disabled-interactive",
                            icon ? "pl-10 pr-3" : "px-3",
                            error && "border-red-500 focus:ring-red-500/50",
                            className
                        )}
                        {...props}
                    />
                </div>

                {error && (
                    <p id={`${id}-error`} className="text-xs text-red-400 mt-1">
                        {error}
                    </p>
                )}
            </div>
        )
    }
);
Input.displayName = "Input";
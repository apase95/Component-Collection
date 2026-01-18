import React from "react";
import { cn } from "../../libs/utils";


interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?: string,
    error?: string,
    isHtmlSupport?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, isHtmlSupport, id: idProp,...props }, ref) => {
        const generatedId = React.useId();
        const id = idProp ?? generatedId;
        
        return (
            <div className={cn("w-full space-y-1.5")}>
                {label && <label htmlFor={id}>{label}</label>}

                <div className={cn(
                    "relative w-full rounded-lg bg-slate-500/50 border border-slate-700 overflow-hidden interactive-focus"
                )}>
                    {isHtmlSupport && (
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-700 bg-slate-800/50">
                        <span className="text-xs font-bold text-slate-400 cursor-pointer hover:text-white">B</span>
                        <span className="text-xs italic text-slate-400 cursor-pointer hover:text-white">I</span>
                        <span className="text-xs underline text-slate-400 cursor-pointer hover:text-white">U</span>
                        <div className="h-3 w-1 bg-slate-600 mx-1"></div>
                        <span className="text-xs text-slate-400 cursor-pointer hover:text-white">Code</span>
                        </div>
                    )}

                    <textarea
                        id={id}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={cn(
                            "flex w-full bg-transparent text-white placeholder:text-slate-500 resize-none p-3 focus:outline-none custom-scrollbar",
                            "min-h-[96px] max-h-[240px] overflow-y-auto",
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
        );
    }
);
Textarea.displayName = "Textarea";
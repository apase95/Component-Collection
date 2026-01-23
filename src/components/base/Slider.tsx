import * as React from "react";
import { cn } from "../../libs/utils";


type SliderSize = "sm" | "md" | "lg";
interface SliderProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
>{
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    size?: SliderSize;
    showValue?: boolean;
}

const SIZE_MAP: Record<
    SliderSize,
    {
        track: string;
        thumb: string;
    }
> = {
    sm: {
        track: "h-1",
        thumb: "h-4 w-4",
    },
    md: {
        track: "h-1.5",
        thumb: "h-5 w-5",
    },
    lg: {
        track: "h-2",
        thumb: "h-6 w-6",
    },
};

export const Slider = React.forwardRef<
    HTMLInputElement, 
    SliderProps
>(({
    className,
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    defaultValue = min,
    onChange,
    disabled,
    size = "md",
    showValue = false,
    ...props
}, ref) => {
    
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<number>(defaultValue);
    React.useEffect(() => {
        if (!isControlled) {
            setInternalValue(defaultValue);
        }
    }, [defaultValue, isControlled]);

    const value = isControlled ? controlledValue : internalValue;
    const percentage = React.useMemo(() => {
        const range = max - min || 1;
        const safeValue = value ?? min;
        const percent = ((safeValue - min) / range) * 100;
        return Math.min(Math.max(percent, 0), 100);
    }, [value, min, max]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    return (
        <div
            className={cn(
                "group relative w-32 h-6 select-none touch-none",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <div className="absolute inset-0 flex items-center">
                <div
                    className={cn(
                        "relative w-full rounded-full bg-slate-700/60",
                        SIZE_MAP[size].track
                    )}
                >
                    <div
                        className={cn(
                            "absolute left-0 top-0 h-full rounded-full bg-white",
                            "transition-all duration-200 ease-out"
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <div
                className={cn(
                    "absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                    "bg-white shadow-md border border-slate-200/30",
                    "transition-all duration-200 ease-out",
                    "opacity-0 scale-50",
                    "group-hover:opacity-100 group-hover:scale-100",
                    "peer-focus:opacity-100 peer-focus:scale-100 peer-focus:ring-2 peer-focus:ring-green-500/40",
                    "group-active:opacity-100 group-active:scale-110",
                    SIZE_MAP[size].thumb
                )}
                style={{ left: `${percentage}%` }}
            />

            <input
                ref={ref}
                type="range"
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={`${value}`}
                min={min}
                max={max}
                step={step}
                value={value}
                disabled={disabled}
                onChange={handleChange}
                className={cn(
                    "peer absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10",
                    disabled && "cursor-not-allowed"
                )}
                {...props}
            />

            {showValue && (
                <div
                    className={cn(
                        "absolute -top-8 text-xs font-bold px-2 py-1 rounded text-white",
                        "opacity-0 transition-opacity duration-200",
                        "group-hover:opacity-100 peer-focus:opacity-100"
                    )}
                    style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
                >
                    {value}
                </div>
            )}
        </div>
    );
  }
);

Slider.displayName = "Slider";

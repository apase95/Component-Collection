import * as React from "react";
import { cn } from "../../libs/utils";


type AspectRatioPreset = "square" | "video" | "portrait" | "wide";
const PRESET_RATIO: Record<AspectRatioPreset, number> = {
    square: 1,
    video: 16 / 9,
    portrait: 3 / 4,
    wide: 21 / 9,
};
export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
    ratio?: number;
    preset?: AspectRatioPreset;
}

export const AspectRatio = React.forwardRef<
    HTMLDivElement,
    AspectRatioProps
>(({
    className,
    ratio,
    preset = "video",
    children,
    ...props
}, ref) => {
    
    const finalRatio = ratio ?? PRESET_RATIO[preset];

    return (
        <div
            ref={ref}
            className={cn(
                "relative w-full overflow-hidden rounded-lg",
                className
            )}
            style={{
                paddingBottom: `${100 / finalRatio}%`,
            }}
            {...props}
        >
            <div className="absolute inset-0">
                {children}
            </div>
        </div>
    );
});

AspectRatio.displayName = "AspectRatio";

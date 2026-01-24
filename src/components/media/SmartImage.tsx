import * as React from "react";
import { cn } from "../../libs/utils";
import { AspectRatio } from "../base/AspectRatio";
import { Skeleton } from "../feedback/Skeleton";

export interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    ratio?: number;
    fallback?: React.ReactNode;
    showSkeleton?: boolean;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    blurOnLoad?: boolean;
    onLoadingComplete?: () => void;
}

export const SmartImage = React.forwardRef<
    HTMLImageElement,
    SmartImageProps
>(({
    className,
    src,
    alt = "",
    ratio = 1,
    fallback,
    showSkeleton = true,
    objectFit = "cover",
    blurOnLoad = true,
    onLoadingComplete,
    loading = "lazy",
    ...props
}, ref) => {

    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const handleLoad = () => {
        setLoaded(true);
        onLoadingComplete?.();
    };

    return (
        <AspectRatio ratio={ratio} className="bg-slate-800/40">
            <Skeleton
                show={showSkeleton && !loaded && !error}
                className="absolute inset-0 rounded-none"
            />

            {error && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">
                    {fallback ?? "Image unavailable"}
                </div>
            )}

            {!error && (
                <img
                    ref={ref}
                    src={src}
                    alt={alt}
                    loading={loading}
                    onLoad={handleLoad}
                    onError={() => setError(true)}
                    className={cn(
                        "h-full w-full transition-all duration-300",
                        loaded ? "opacity-100" : "opacity-0",
                        blurOnLoad && !loaded && "blur-md scale-[1.02]",
                        objectFit === "cover" && "object-cover",
                        objectFit === "contain" && "object-contain",
                        objectFit === "fill" && "object-fill",
                        objectFit === "none" && "object-none",
                        objectFit === "scale-down" && "object-scale-down",
                        className
                    )}
                    {...props}
                />
            )}
        </AspectRatio>
    );
});

SmartImage.displayName = "SmartImage";

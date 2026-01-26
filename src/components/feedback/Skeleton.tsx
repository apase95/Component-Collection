import React from "react";
import { cn } from "../../libs/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../data-display/Card";


interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    show?: boolean;
}
const Skeleton = React.forwardRef<
    HTMLDivElement, 
    SkeletonProps
>(({ className, show = true, children, ...props }, ref) => {

    if (!show) return <>{children}</>;

    return (
        <div 
            ref={ref}
            className={cn(
                "animate-pulse rounded-md bg-neutral-700/50",
                "border border-white/10",
                className
            )}
            {...props}
        />
    );
  }
);
Skeleton.displayName = "Skeleton";


interface SkeletonTextProps extends SkeletonProps {
    lines?: number;
    lastLinePercent?: string;
}
const SkeletonText = React.forwardRef<
    HTMLDivElement, 
    SkeletonTextProps
>(({ className, lines = 3, lastLinePercent = "80%", ...props }, ref) => {

    return (
        <div
            ref={ref}
            className={cn(
                "w-full space-y-2",
                className
            )}
            {...props}
        >
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn(
                        "h-4 w-full",
                        i === lines - 1 && "w-[var(--last-width)]"
                    )}
                    style={
                        i === lines - 1 
                            ? ({ "--last-width": lastLinePercent } as React.CSSProperties) 
                            : undefined
                    }
                />
            ))}
        </ div>
    );
  }
);
SkeletonText.displayName = "SkeletonText";


interface SkeletonAvatarProps extends SkeletonProps {
    size?: "sm" | "md" | "lg" | "xl";
    shape?: "circle" | "square";
}
const SkeletonAvatar = React.forwardRef<
    HTMLDivElement, 
    SkeletonAvatarProps
>(({ className, size = "md", shape = "circle", ...props }, ref) => {

    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-20 h-20"
    };

    const shapeClasses = {
        circle: "rounded-full",
        square: "rounded-md"
    };

    return (
        <Skeleton
            ref={ref}
            className={cn(
                sizeClasses[size],
                shapeClasses[shape],
                className
            )}
            {...props}
        />
    );
});
SkeletonAvatar.displayName = "SkeletonAvatar";


interface SkeletonButtonProps extends SkeletonProps {
    size?: "sm" | "md" | "lg" | "icon";
}
const SkeletonButton = React.forwardRef<
    HTMLDivElement, 
    SkeletonButtonProps
>(({ className, size = "md", ...props }, ref) => {

    const sizeClasses = {
        sm: "h-8 w-20",
        md: "h-10 w-28",
        lg: "h-12 w-36",
        icon: "h-10 w-10",
    };

    return (
        <Skeleton
            ref={ref}
            className={cn(
                "rounded-lg",
                sizeClasses[size],
                className
            )}
            {...props}
        />
    );
});
SkeletonButton.displayName = "SkeletonButton";


const SkeletonCard = React.forwardRef<
    HTMLDivElement, 
    SkeletonProps
>(({ className, ...props }, ref) => {

    return (
        <Card ref={ref} className={cn("w-full", className)} {...props}>
            <CardHeader className="flex-row gap-4 items-center space-y-0">
                <SkeletonAvatar size="md" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-3 w-14" />
                </div>
            </CardHeader>
            <CardContent>
                <SkeletonText lines={3} />
            </CardContent>
            <CardFooter>
                <SkeletonButton size="md" />
            </CardFooter>
        </Card>
    );
});
SkeletonCard.displayName = "SkeletonCard";


interface SkeletonFormProps extends SkeletonProps {
    fields?: number;
}
const SkeletonForm = React.forwardRef<
    HTMLDivElement, 
    SkeletonFormProps
>(({ className, fields = 3, ...props }, ref) => {

    return (
        <div
            ref={ref}
            className={cn(
                "w-full space-y-6",
                className
            )}
            {...props}
        >
            {Array.from({ length: fields }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            ))}
        </div>
    );
});
SkeletonForm.displayName = "SkeletonForm";


interface SkeletonTableProps extends SkeletonProps {
    rows?: number;
    columns?: number;
}
const SkeletonTable = React.forwardRef<
    HTMLDivElement, 
    SkeletonTableProps
>(({ className, rows = 5, columns = 4, ...props }, ref) => {

    return (
        <div
            ref={ref}
            className={cn(
                "w-full space-y-6",
                className
            )}
            {...props}
        >
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                    {Array.from({ length: columns }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                    ))}
                </div>
            ))}
        </div>
    );
});
SkeletonTable.displayName = "SkeletonTable";


export { 
    Skeleton, 
    SkeletonText, 
    SkeletonAvatar, 
    SkeletonButton, 
    SkeletonCard, 
    SkeletonForm, 
    SkeletonTable 
};
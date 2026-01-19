import { cn } from "../../libs/utils";

interface IconWrapperProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    as?: React.ElementType;
    disabled?: boolean;
};
export const IconWrapper = ({
     as: Component = "div",
     children,
     className,
     disabled,
     ...props
}: IconWrapperProps ) => {
    return (
        <Component
            className={cn(
                "flex-center flex-col rounded-lg p-2 text-slate-400",
                "transition-colors",
                !disabled && "hover:text-white hover:bg-white/10 cursor-pointer",
                disabled && "opacity-50 pointer-events-none",
                className
            )}
            tabIndex={disabled ? -1 : undefined}
            aria-disabled={disabled}
            {...props}
        >
                {children}
        </Component>
    );
};

interface GlassImageProps {
    src: string;
    alt?: string;
    className?: string;
};
export const GlassImage = ({ src, alt = "", className }: GlassImageProps
) => (
    <div className={cn(
        "relative overflow-hidden rounded-xl border border-glass-border bg-glass-surface",
        "shadow-2xl group",
        className
    )}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                z-10 pointer-events-none"
        />
        <img 
            src={src} 
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
    </div>
);
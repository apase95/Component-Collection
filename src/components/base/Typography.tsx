import { cn } from "../../libs/utils";

type Variant = "h1" | "h2" | "h3" | "body" | "caption" | "code";
interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?: Variant;
    as?: React.ElementType;
}

const variants: Record<Variant, string> = {
    h1: "text-4xl font-bold text-white tracking-tight",
    h2: "text-3xl font-semibold text-white",
    h3: "text-xl font-medium text-accent",
    body: "text-base text-slate-300 leading-relaxed",
    caption: "text-xs text-slate-500",
    code: "font-mono text-sm bg-black/30 px-1 py-0.5 rounded text-accent",
};

export const Typography = ({ variant = "body", className, as, children, ...props }: TypographyProps) => {
    const Component = as ?? 
        (variant === "code" ? "code" : variant === "body" || variant === "caption" ? "p" : variant);
    
        return (
        <Component
            className={cn(variants[variant], className)}
            {...props}
        >
            {children}
        </Component>
    );
};
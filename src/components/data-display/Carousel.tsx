import React from "react";
import { cn } from "../../libs/utils";
import { Button } from "../base/Button";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";


interface CarouselContextType {
    carouselRef: React.RefObject<HTMLDivElement>;
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
};
const CarouselContext = React.createContext<CarouselContextType | undefined>(undefined);
const useCarousel = () => {
    const ctx = React.useContext(CarouselContext);
    if (!ctx) {
        throw new Error("Carousel components must be used within <Carousel />");
    }
    return ctx;
};


interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {}
const Carousel = ({ className, children, ...props }: CarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const scrollByItem = React.useCallback((dir: -1 | 1) => {
        const el = carouselRef.current;
        if (!el) return;

        const item = el.querySelector("[data-carousel-item]") as HTMLElement;
        if (!item) return;

        const gap = parseInt(getComputedStyle(el).columnGap || "16", 10) || 16;
        const amount = item.offsetWidth + gap;
        el.scrollBy({
            left: dir * amount,
            behavior: "smooth",
        });
    }, []);

    const scrollPrev = () => scrollByItem(-1);
    const scrollNext = () => scrollByItem(1);

    const updateScrollState = React.useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;

        setCanScrollPrev(el.scrollLeft > 1);
        setCanScrollNext(
            el.scrollLeft < el.scrollWidth - el.clientWidth - 1
        );
    }, []);

    React.useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollState);
        updateScrollState();

        return () => el.removeEventListener("scroll", updateScrollState);
    }, [updateScrollState]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div
                className={cn("relative", className)}
                role="region"
                aria-roledescription="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
};


const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    
    const { carouselRef } = useCarousel();

    return (
        <div
            ref={(node) => {
                carouselRef.current = node!;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
            }}
            className={cn(
                "flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory",
                "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]", 
                "[&::-webkit-scrollbar]:hidden", 
                className
            )}
            {...props}
        />
    );
});
CarouselContent.displayName = "CarouselContent";


const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-carousel-item
        role="group"
        aria-roledescription="slide"
        className={cn(
            "shrink-0 grow-0 snap-center",
            "basis-full", 
            className
        )}
        {...props}
    />
));
CarouselItem.displayName = "CarouselItem";


interface CarouselControlProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    direction: "prev" | "next";
}
const CarouselControl = React.forwardRef<
    HTMLButtonElement,
    CarouselControlProps
>(({ direction, className, ...props }, ref) => {
    const {
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
    } = useCarousel();

    const isPrev = direction === "prev";
    const disabled = isPrev ? !canScrollPrev : !canScrollNext;
    const onClick = isPrev ? scrollPrev : scrollNext;
    const Icon = isPrev ? CgChevronLeft : CgChevronRight;

    return (
        <Button
            ref={ref as any}
            variant="glass"
            size="icon"
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "absolute top-1/2 -translate-y-1/2 z-10 rounded-full",
                isPrev ? "left-4" : "right-4",
                "disabled:opacity-0 disabled:pointer-events-none transition-opacity",
                className
            )}
            {...props}
        >
            <Icon className="h-6 w-6" />
            <span className="sr-only">
                {isPrev ? "Previous slide" : "Next slide"}
            </span>
        </Button>
    );
});
CarouselControl.displayName = "CarouselControl";


const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
    <CarouselControl ref={ref} direction="prev" {...props} />
));
CarouselPrevious.displayName = "CarouselPrevious";


const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
    <CarouselControl ref={ref} direction="next" {...props} />
));
CarouselNext.displayName = "CarouselNext";


export { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselPrevious, 
    CarouselNext 
};
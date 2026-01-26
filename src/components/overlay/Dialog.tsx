import React from "react";
import { cn } from "../../libs/utils";
import { Button } from "../base/Button";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";


interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const DialogContext = React.createContext<DialogContextType | undefined>(undefined);
const useDialog = () => {
  const ctx = React.useContext(DialogContext);
  if (!ctx) {
    throw new Error("Dialog components must be used inside <Dialog />");
  }
  return ctx;
};


interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
const Dialog = ({ 
    children, 
    open: controlledOpen, 
    onOpenChange 
}: DialogProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? onOpenChange! : setUncontrolledOpen;

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
};


const DialogTrigger = React.forwardRef<
    HTMLButtonElement, 
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...props }, ref) => {
    
    const { setOpen } = useDialog();

    return (
        <Button
            ref={ref}
            onClick={(e) => {
                setOpen(true);
                onClick?.(e);
            }}
            {...props}
        />
    );
  }
);
DialogTrigger.displayName = "DialogTrigger";


const DialogOverlay = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    
    const { setOpen } = useDialog();
    
    return (
        <div
            ref={ref}
            onClick={() => setOpen(false)}
            className={cn(
                "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
                "animate-in fade-in duration-300",
                className
            )}
            {...props}
        />
    )
});
DialogOverlay.displayName = "DialogOverlay";


export const DialogPortal = (
    { children }: { children: React.ReactNode }
) => {
    
    const { open } = useDialog();
    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
            {children}
        </div>,
        document.body
    );
};

const DialogContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    
    const { setOpen } = useDialog();

    React.useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [setOpen]);

    return (
        <DialogPortal>
            <DialogOverlay />
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    "fixed z-50 grid w-full max-w-lg gap-4 p-6",
                    "bg-primary-theme border border-secondary-theme shadow-2xl",
                    "sm:rounded-xl",
                    "animate-in fade-in zoom-in-95 slide-in-from-bottom-10 sm:slide-in-from-bottom-0",
                    className
                )}
                {...props}
            >
                {children}  

                <button
                    onClick={() => setOpen(false)}
                    className={cn(
                        "absolute right-4 top-4 rounded-sm p-1",
                        "text-slate-300 hover:text-white",
                        "focus:outline-none focus:ring-2 focus:ring-accent",
                    )}
                >
                    <CgClose className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
        </DialogPortal>
    );
});
DialogContent.displayName = "DialogContent";


const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left", 
            className
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";


const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
            className
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";


const DialogTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn(
            "text-lg font-semibold tracking-tight text-white", 
            className
        )}
        {...props}
    />
));
DialogTitle.displayName = "DialogTitle";


const DialogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn(
            "text-sm text-slate-400 leading-relaxed", 
            className
        )}
        {...props}
    />
));
DialogDescription.displayName = "DialogDescription";


export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
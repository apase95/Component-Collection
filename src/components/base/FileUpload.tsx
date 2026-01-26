import React from "react";
import { cn } from "../../libs/utils";
import { useFileUploadLogic } from "../../hooks/useFileUpload";
import { FaCloudUploadAlt, FaFileAlt, FaTrashAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";


type FileUploadContextType = ReturnType<typeof useFileUploadLogic>;
const FileUploadContext = React.createContext<FileUploadContextType | undefined>(undefined);
const useFileUpload = () => {
    const cxt = React.useContext(FileUploadContext);
    if (!cxt) throw new Error("FileUpload components must be used within <FileUpload />");
    return cxt;
};


interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
    maxFiles?: number;
    onFilesChange?: (files: File[]) => void;
    accept?: string;
}
const FileUpload = React.forwardRef<
    HTMLDivElement, 
    FileUploadProps
>(({ 
    className, 
    maxFiles, 
    onFilesChange, 
    accept, 
    children, 
    ...props 
}, ref) => {
        
    const logic = useFileUploadLogic({ maxFiles, onFilesChange, accept });

    return (
        <FileUploadContext.Provider value={logic}>
            <div
                ref={ref}
                className={cn(
                    "relative flex flex-col gap-3 rounded-xl",
                    "bg-primary-theme p-4",
                    "border border-secondary-theme transition-colors",
                    logic.isDragging && "border-white/40 bg-white/5",
                    className
                )}
                onDragOver={logic.onDragOver}
                onDragLeave={logic.onDragLeave}
                onDrop={logic.onDrop}
                {...props}
            >
                <input
                    ref={logic.inputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept={accept}
                    onChange={logic.onChange}
                />
                {children}
            </div>
        </FileUploadContext.Provider>
    );
});
FileUpload.displayName = "FileUpload";


const FileUploadTrigger = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ 
    className, 
    children, 
    ...props 
}, ref) => {
    
    const { triggerUpload, fileList, maxFiles } = useFileUpload();
    const isFull = fileList.length >= maxFiles;

    return (
        <div
            ref={ref}
            role="button"
            tabIndex={isFull ? -1 : 0}
            onClick={!isFull ? triggerUpload : undefined}
            onKeyDown={(e) => {
                if (!isFull && (e.key === "Enter" || e.key === " ")) {
                    triggerUpload();
                }
            }}
            className={cn(
                "flex-center flex-col rounded-lg", 
                "p-6 text-center transition-all",
                "border-2 border-dashed border-secondary-theme", 
                isFull 
                    ? "cursor-not-allowed opacity-50 bg-black/20" 
                    : "cursor-pointer hover:border-white/30 hover:bg-white/5",
                className
            )}
            {...props}
        >
            {children || (
                <>
                    <div className="h-10 w-10 flex-center rounded-full bg-white/5 mb-3">
                        <FaCloudUploadAlt className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-200">
                            {isFull ? "Limit reached" : "Click to upload"}
                        </p>
                        <p className="text-xs text-slate-500">
                            SVG, PNG, JPG or PDF (Max {maxFiles} files)
                        </p>
                    </div>
                </>
            )}
        </div>
    );
});
FileUploadTrigger.displayName = "FileUploadTrigger";


const FileUploadPreview = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    
    const { fileList, removeFile } = useFileUpload();
    if (fileList.length === 0) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "grid gap-3 grid-cols-1 sm:grid-cols-2", 
                className
            )}
            {...props}
        >
            {fileList.map((item) => {
                const isImage = item.file.type.startsWith("image/");
                return (
                    <div 
                        key={item.id}
                        className="relative flex items-center gap-3 p-2 bg-black/20 rounded-md border border-secondary-theme overflow-hidden group"
                    >
                        <div className="h-10 w-10 flex-center shrink-0 bg-white/5 overflow-hidden rounded-md">
                            {isImage ? (
                                <img 
                                    src={item.preview} 
                                    alt={item.file.name} 
                                    className="h-full w-full object-cover" 
                                />
                            ) : (
                                <FaFileAlt className="h-5 w-5 text-slate-400" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-slate-200">
                                {item.file.name}
                            </p>
                            <p className="text-xs text-slate-500">
                                {(item.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFile(item.id);
                            }}
                            className="p-1.5 rounded-sm text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors focus:outline-none"
                            aria-label={`Remove ${item.file.name}`}
                        >
                            <FaXmark className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
});
FileUploadPreview.displayName = "FileUploadPreview";


const FileUploadRemove = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ 
    className, 
    children, 
    ...props 
}, ref) => {

    const { clearAll, fileList } = useFileUpload();
    if (fileList.length === 0) return null;

    return (
        <button
            ref={ref}
            type="button"
            onClick={clearAll}
            className={cn(
                "w-full flex-center gap-2 rounded-md", 
                "py-2 text-sm font-medium text-red-400 transition-colors",
                "hover:bg-red-500/10 hover:text-red-300",
                className
            )}
            {...props}
        >
            {children || (
                <div className="flex-center gap-2 p-1 cursor-pointer">
                    <FaTrashAlt className="h-3.5 w-3.5" />
                    <span>Remove All</span>
                </div>
            )}
        </button>
    );
});
FileUploadRemove.displayName = "FileUploadRemove";


export {
    FileUpload,
    FileUploadTrigger,
    FileUploadPreview,
    FileUploadRemove,
};
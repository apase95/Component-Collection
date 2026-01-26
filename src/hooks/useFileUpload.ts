import { useState, useCallback, useEffect, useRef, useMemo } from "react";


export interface FileWithPreview {
    id: string;
    file: File;
    preview: string;
}

interface UseFileUploadProps {
    maxFiles?: number;
    initialFiles?: File[];
    onFilesChange?: (files: File[]) => void;
    accept?: string;
}

export const useFileUploadLogic = ({
    maxFiles = 5,
    initialFiles = [],
    onFilesChange,
    accept,
}: UseFileUploadProps = {}) => {
    
    const [fileList, setFileList] = useState<FileWithPreview[]>(() => {
        return initialFiles.map(f => ({
            id: Math.random().toString(36).substring(7),
            file: f,
            preview: URL.createObjectURL(f)
        }));
    });
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const revokePreview = (url: string) => {
        if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
        }
    };

    useEffect(() => {
        return () => {
            fileList.forEach(item => revokePreview(item.preview));
        };
    }, []);

    const handleFiles = useCallback((newFiles: FileList | null) => {
        if (!newFiles) return;
        
        setFileList((prev) => {
            const availableSlots = maxFiles - prev.length;
            if (availableSlots <= 0) return prev;

            const validNewFiles = Array.from(newFiles).slice(0, availableSlots);
            
            const newItems: FileWithPreview[] = validNewFiles.map(file => ({
                id: Math.random().toString(36).substring(7),
                file,
                preview: URL.createObjectURL(file)
            }));

            const updatedList = [...prev, ...newItems];
            
            onFilesChange?.(updatedList.map(item => item.file));
            
            return updatedList;
        });
    }, [maxFiles, onFilesChange]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        if (inputRef.current) inputRef.current.value = "";
    }, [handleFiles]);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const removeFile = useCallback((idToRemove: string) => {
        setFileList((prev) => {
            const itemToRemove = prev.find(item => item.id === idToRemove);
            if (itemToRemove) revokePreview(itemToRemove.preview);

            const updated = prev.filter((item) => item.id !== idToRemove);            
            onFilesChange?.(updated.map(item => item.file));

            return updated;
        });
    }, [onFilesChange]);

    const clearAll = useCallback(() => {
        setFileList((prev) => {
            prev.forEach((item) => revokePreview(item.preview));
            return [];
        });
        onFilesChange?.([]);
        if (inputRef.current) inputRef.current.value = "";
    }, [onFilesChange]);

    const triggerUpload = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const memoizedState = useMemo(() => ({
        fileList,
        isDragging,
        onChange,
        onDrop,
        onDragOver,
        onDragLeave,
        removeFile,
        clearAll,
        triggerUpload,
        accept,
        maxFiles,
    }), [
        fileList,
        isDragging,
        onChange,
        onDrop,
        onDragOver,
        onDragLeave,
        removeFile,
        clearAll,
        triggerUpload,
        accept,
        maxFiles,
    ]);

    return {
        ...memoizedState,
        inputRef
    };
};
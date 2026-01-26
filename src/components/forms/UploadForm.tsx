import { 
    FileUpload, 
    FileUploadTrigger, 
    FileUploadPreview, 
    FileUploadRemove 
} from "../base/FileUpload";
import { Typography } from "../base/Typography";

export const UploadForm = () => {
    
    const handleFiles = (files: File[]) => {
        console.log("Selected files:", files);
    };

    return (
        <div className="min-h-125 p-10 flex-center flex-col gap-8">
            
            <div className="w-full max-w-md space-y-2">
                <Typography variant="h3">
                    Upload Documents
                </Typography>
                <FileUpload 
                    maxFiles={3} 
                    accept=".pdf,.docx,.txt"
                    onFilesChange={handleFiles}
                >
                    <FileUploadTrigger />
                    <FileUploadPreview />
                    <FileUploadRemove />
                </FileUpload>
            </div>


            <div className="w-full max-w-md space-y-2">
                <Typography variant="h3">
                    Upload Images
                </Typography>
                
                <FileUpload 
                    maxFiles={3} 
                    accept="image/*"
                    onFilesChange={handleFiles}
                >
                    <FileUploadTrigger className="h-32" >
                        <span className="text-slate-400 font-semibold">
                            + Add Images (Max 3 image)
                        </span>
                    </FileUploadTrigger>
                    <FileUploadPreview />
                    <FileUploadRemove />
                </FileUpload>
            </div>

        </div>
    );
};
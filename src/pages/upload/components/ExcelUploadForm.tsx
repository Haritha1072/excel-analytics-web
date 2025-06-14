import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadedFiles } from "@/hooks/useUploadedFiles";
import fileUploadService from "@/services/fileUploadService";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ExcelUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadedFiles, refetch } = useUploadedFiles();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = async () => {
    if (!uploadedFiles || uploadedFiles.length === 0) {
      toast.error("No files to delete");
      return;
    }
    try {
      await fileUploadService.deleteFiles();
      console.log("Files deleted successfully");
      toast.success("Files deleted successfully!");
    } catch (error) {
      console.error("Error deleting files:", error);
      toast.error("Failed to delete files.");
    }
    refetch();
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }
    await fileUploadService.uploadFile(file);
    toast.success("File uploaded successfully!");
    handleClearFile();
    refetch();
  };

  return (
    <div className="w-full space-y-3">
      <Label>Upload your excel sheets</Label>
      <Input
        type="file"
        className="max-w-md"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {file && (
        <div className="p-2">
          <div>
            <p className="text-sm text-gray-700 py-2.5">
              ready to upload file:
            </p>
            <div className="flex items-center justify-between gap-2 max-w-md pr-4">
              <span>{file.name}</span>
              <div>
                <IoIosCloseCircleOutline
                  className="cursor-pointer text-red-400 hover:text-red-600"
                  size={20}
                  onClick={handleClearFile}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {uploadedFiles && uploadedFiles.length > 0 && (
        <div className="p-2">
          <p className="text-sm text-gray-700">Uploaded Files:</p>
          <div className="flex flex-col gap-2 max-w-md">
            {uploadedFiles.map((file, index) => (
              <div
                key={file.filename}
                className="flex items-center justify-between pr-4">
                <p>
                  {index + 1}. {file.filename}
                </p>
                <Button
                  onClick={handleDeleteFile}
                  size="sm"
                  variant={"outline"}
                  className="py-1 px-4 hover:bg-red-500 hover:text-white">
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={handleUpload} className="max-w-md">
        Upload File
      </Button>
    </div>
  );
};

export default ExcelUploadForm;

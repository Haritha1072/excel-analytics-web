import fileUploadService, {
  FileUploadResponse,
} from "@/services/fileUploadService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useUploadedFiles = () => {
  const [uploadedFiles, setUploadedFiles] = useState<
    FileUploadResponse[] | null
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fileUploadService.getFiles();
      setUploadedFiles(response);
    } catch (error) {
      toast.error("Failed to fetch uploaded files.");
      console.error("Error fetching uploaded files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return { uploadedFiles, isLoading, refetch: fetchUploadedFiles };
};

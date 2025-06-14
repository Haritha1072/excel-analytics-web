import { http } from "./axios";
import { BaseService } from "./BaseService";

export type FileUploadResponse = {
  _id: string;
  user_id: string;
  filename: string;
  data: {
    type: string;
    data: number[];
  };
  contentType: string;
  uploadedAt: string;
  __v: number;
};

class FileUploadService extends BaseService {
  constructor() {
    super(http);
  }

  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await this.post<string>("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  }

  async getFiles(): Promise<FileUploadResponse[]> {
    const response = await this.get<FileUploadResponse[]>("/files");
    return response;
  }

  async deleteFiles(): Promise<void> {
    await this.delete("/files");
  }
}

const fileUploadService = new FileUploadService();
export default fileUploadService;

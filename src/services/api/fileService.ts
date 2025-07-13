import { BaseApiService } from './baseApiService';

interface DocumentUploadResponse {
  fileId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export class FileService extends BaseApiService {
  async uploadDocument(file: File, type: string): Promise<DocumentUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.upload<DocumentUploadResponse>('/api/upload/document', formData);
  }

  async downloadStatement(statementId: string): Promise<Blob> {
    return this.download(`/api/download/statement/${statementId}`);
  }

  async downloadFile(fileId: string): Promise<Blob> {
    return this.download(`/api/download/file/${fileId}`);
  }

  downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

export const fileService = new FileService();
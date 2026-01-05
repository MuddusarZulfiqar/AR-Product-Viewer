export interface Model3D {
  id: string;
  name: string;
  url: string; // Now stores data URL instead of blob URL
  file?: File; // Optional - not persisted to storage
  fileSize?: number; // Original file size in bytes
  thumbnail?: string;
  uploadDate: string;
}

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface ARConfig {
  enableAR: boolean;
  placement: 'floor' | 'wall';
  scale: number;
}

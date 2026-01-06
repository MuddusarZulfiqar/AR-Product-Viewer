import React, { useState, useCallback } from 'react';
import { Model3D } from '../types/types';
import { useModelStore } from '../store/modelStore';
import './ModelUpload.css';

const ModelUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addModel = useModelStore((state) => state.addModel);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ['model/gltf-binary', 'model/gltf+json', 'application/octet-stream'];
    const validExtensions = ['.glb', '.gltf'];
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!hasValidExtension && !validTypes.includes(file.type)) {
      setError('Please upload a GLB or GLTF file');
      return false;
    }

    // Increased to 1GB for larger model support
    if (file.size > 1024 * 1024 * 1024) {
      setError('File size must be less than 1GB');
      return false;
    }

    return true;
  };

  const processFile = async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setError(null);

    try {
      // Convert file to data URL using FileReader
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(file);
      });

      // Create model object with data URL
      const model: Model3D = {
        id: `model-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name.replace(/\.(glb|gltf)$/i, ''),
        url: dataUrl, // Store as data URL instead of blob URL
        fileSize: file.size,
        uploadDate: new Date().toISOString()
      };

      // Add to store (this will persist to localStorage)
      try {
        addModel(model);
      } catch (storageError: any) {
        // Handle localStorage quota exceeded
        if (storageError.name === 'QuotaExceededError' || 
            storageError.message?.includes('quota')) {
          setError('Storage quota exceeded. Please delete some models or try a smaller file.');
          setIsUploading(false);
          return;
        }
        throw storageError;
      }

      // Reset state
      setIsUploading(false);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload model. Please try again.');
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="model-upload">
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-input"
          accept=".glb,.gltf"
          onChange={handleFileInput}
          disabled={isUploading}
          style={{ display: 'none' }}
        />
        
        <label htmlFor="file-input" className="upload-label">
          {isUploading ? (
            <>
              <div className="spinner"></div>
              <p className="upload-text">Uploading model...</p>
            </>
          ) : (
            <>
              <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="upload-text">
                <span className="upload-text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="upload-text-secondary">GLB or GLTF files (max 1GB)</p>
            </>
          )}
        </label>
      </div>

      {error && (
        <div className="error-message animate-slide-up">
          <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default ModelUpload;

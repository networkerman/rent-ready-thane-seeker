
import React from 'react';
import { UploadedFile } from './types';

interface PhotoPreviewProps {
  uploadedFiles: UploadedFile[];
  onRemove: (index: number) => void;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ uploadedFiles, onRemove }) => {
  if (uploadedFiles.length === 0) return null;

  return (
    <div className="mt-6">
      <p className="form-label mb-2">Uploaded Photos ({uploadedFiles.length})</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {uploadedFiles.map((file, index) => (
          <div 
            key={index}
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
          >
            <img 
              src={file.preview} 
              alt={`Upload ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white hover:bg-opacity-80"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoPreview;


import React from 'react';
import { Upload } from 'lucide-react';

interface PhotoDragDropProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoDragDrop: React.FC<PhotoDragDropProps> = ({ onFileChange }) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
      <input
        type="file"
        id="photos"
        name="photos"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onFileChange}
      />
      <label htmlFor="photos" className="cursor-pointer">
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-lg font-medium">Drop photos here or click to browse</p>
          <p className="text-gray-500 text-sm mt-1">Accepts JPG, PNG (max 5MB each)</p>
        </div>
      </label>
    </div>
  );
};

export default PhotoDragDrop;


import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Image, Upload } from 'lucide-react';

interface UploadedFile {
  file: File;
  preview: string;
}

const PhotoUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }
      
      if (file.size > 5 * 1024 * 1024) {  // 5MB limit
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }
      
      const preview = URL.createObjectURL(file);
      newFiles.push({ file, preview });
    }
    
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }
    
    setUploading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // This is where you'd normally submit to a backend
      // For now, we'll simulate submission with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Property details submitted successfully!");
      
      // Reset form
      e.currentTarget.reset();
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
      setUploadedFiles([]);
      
    } catch (error) {
      toast.error("Failed to submit property details");
      console.error('Submission error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="section bg-gray-50" id="upload">
      <div className="container-custom">
        <AnimatedSection delay={300}>
          <h2 className="section-heading">Got a flat? Share it here!</h2>
          
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ownerName" className="form-label">Owner's Name</label>
                  <input 
                    type="text" 
                    id="ownerName" 
                    name="ownerName" 
                    className="form-input" 
                    placeholder="Name of the property owner"
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="contactNumber" className="form-label">Owner Contact Number</label>
                  <input 
                    type="tel" 
                    id="contactNumber" 
                    name="contactNumber" 
                    className="form-input" 
                    placeholder="+91 98765 43210"
                    required 
                    pattern="[0-9+\s]{10,15}"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="propertyAddress" className="form-label">Property Address</label>
                <textarea 
                  id="propertyAddress" 
                  name="propertyAddress" 
                  className="form-input" 
                  rows={3} 
                  placeholder="Full address of the property"
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="expectedRent" className="form-label">Expected Rent (₹ per month)</label>
                <input 
                  type="number" 
                  id="expectedRent" 
                  name="expectedRent" 
                  className="form-input" 
                  placeholder="e.g., 35000"
                  min="1000" 
                  max="200000"
                  required 
                />
              </div>
              
              <div>
                <label className="form-label">Upload Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    id="photos"
                    name="photos"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="photos" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-lg font-medium">Drop photos here or click to browse</p>
                      <p className="text-gray-500 text-sm mt-1">Accepts JPG, PNG (max 5MB each)</p>
                    </div>
                  </label>
                </div>
                
                {uploadedFiles.length > 0 && (
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
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white hover:bg-opacity-80"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="btn-primary w-full sm:w-auto"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Image size={20} />
                      Submit Property Details
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PhotoUpload;

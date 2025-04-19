
import React, { useState } from 'react';
import AnimatedSection from '../AnimatedSection';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PhotoDragDrop from './PhotoDragDrop';
import PhotoPreview from './PhotoPreview';
import PhotoUploadForm from './PhotoUploadForm';
import PhotoUploadActions from './PhotoUploadActions';
import { UploadedFile } from './types';

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
      const photoUrls: string[] = [];

      for (const file of uploadedFiles) {
        const fileExt = file.file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-photos')
          .upload(filePath, file.file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('property-photos')
          .getPublicUrl(filePath);

        photoUrls.push(publicUrl);
      }

      const { error: insertError } = await supabase
        .from('property_listings')
        .insert({
          owner_name: formData.get('ownerName') as string,
          contact_number: formData.get('contactNumber') as string,
          property_address: formData.get('propertyAddress') as string,
          expected_rent: Number(formData.get('expectedRent')),
          photos: photoUrls
        });

      if (insertError) throw insertError;
      
      toast.success("Property details submitted successfully!");
      
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
              <PhotoUploadForm disabled={uploading} />
              <PhotoDragDrop onFileChange={handleFileChange} />
              <PhotoPreview uploadedFiles={uploadedFiles} onRemove={removeFile} />
              <PhotoUploadActions uploading={uploading} />
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PhotoUpload;

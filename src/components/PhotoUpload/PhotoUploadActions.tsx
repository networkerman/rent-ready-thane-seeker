
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';

interface PhotoUploadActionsProps {
  uploading: boolean;
}

const PhotoUploadActions: React.FC<PhotoUploadActionsProps> = ({ uploading }) => {
  return (
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
  );
};

export default PhotoUploadActions;

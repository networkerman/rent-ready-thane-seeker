
import React from 'react';
import { FormData } from './types';

interface PhotoUploadFormProps {
  disabled?: boolean;
}

const PhotoUploadForm: React.FC<PhotoUploadFormProps> = ({ disabled }) => {
  return (
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
          disabled={disabled}
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
          disabled={disabled}
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="propertyAddress" className="form-label">Property Address</label>
        <textarea 
          id="propertyAddress" 
          name="propertyAddress" 
          className="form-input" 
          rows={3} 
          placeholder="Full address of the property"
          required 
          disabled={disabled}
        />
      </div>
      
      <div className="md:col-span-2">
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
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default PhotoUploadForm;

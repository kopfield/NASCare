import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface CardFrontProps {
  imageSrc: string;
}

export const CardFront: React.FC<CardFrontProps> = ({ imageSrc }) => {
  const [imgError, setImgError] = useState(false);

  // Reset error state when image source changes (e.g. user uploads new image)
  useEffect(() => {
    setImgError(false);
  }, [imageSrc]);

  return (
    <div className="w-full h-full overflow-hidden rounded-xl bg-slate-200 shadow-inner relative flex items-center justify-center group-hover:shadow-xl transition-shadow">
      {!imgError ? (
        <img 
          src={imageSrc} 
          alt="Card Cover" 
          className="w-full h-full object-cover object-center"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex flex-col items-center text-slate-400 p-4 text-center bg-slate-100 w-full h-full justify-center border-4 border-dashed border-slate-300">
          <ImageOff size={48} className="mb-2 opacity-50" />
          <p className="font-bold text-slate-500">Cover Image Missing</p>
          <p className="text-xs mt-1">Defaulting to empty state or please upload a new image.</p>
        </div>
      )}
    </div>
  );
};
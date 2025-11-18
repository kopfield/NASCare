import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface CardBackProps {
  message: string;
  onMessageChange: (msg: string) => void;
  imageSrc: string;
}

export const CardBack: React.FC<CardBackProps> = ({ message, onMessageChange, imageSrc }) => {
  const [imgError, setImgError] = useState(false);

  // Reset error state when image source changes
  useEffect(() => {
    setImgError(false);
  }, [imageSrc]);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl bg-amber-50 shadow-inner flex flex-col">
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        {!imgError ? (
          <img 
            src={imageSrc} 
            alt="Card Message Background" 
            className="w-full h-full object-cover object-center"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 p-4 opacity-50">
            <ImageOff size={32} className="text-amber-300 mb-2" />
            <p className="text-xs text-amber-400 text-center">Background image missing</p>
          </div>
        )}
      </div>
      
      {/* 
        Editable Layer 
        We use a semi-transparent white overlay to ensure text is readable 
        regardless of the background image content.
        
        Updated spacing: 
        - pt-8 md:pt-12 (was pt-20 md:pt-24) to move it higher
        - h-3/5 (was h-1/2) to make it longer
      */}
      <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col items-center justify-start pt-8 md:pt-12">
        <div className="w-full h-3/5 relative group">
          {/* Decorative border for the message area */}
          <div className="absolute inset-0 border-2 border-dashed border-slate-300/50 rounded-xl pointer-events-none"></div>
          
          <textarea
            className="w-full h-full bg-white/80 backdrop-blur-[2px] rounded-xl p-6 resize-none 
                       border border-transparent focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100/50
                       outline-none text-center text-slate-800 text-lg md:text-2xl font-['Indie_Flower'] 
                       placeholder-slate-500/70 leading-relaxed shadow-sm transition-all"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Tap here to write your warm wishes..."
            onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking to type
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
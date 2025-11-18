import React from 'react';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';

interface FlipCardProps {
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
  message: string;
  onMessageChange: (msg: string) => void;
  frontImage: string;
  backImage: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ 
  isFlipped, 
  setIsFlipped, 
  message, 
  onMessageChange,
  frontImage,
  backImage
}) => {
  return (
    <div 
      className="relative group perspective-1000 w-full max-w-[700px] aspect-[4/3] cursor-pointer"
      onClick={() => {
        // Only flip if we aren't clicking the textarea
        // This logic is handled by preventing propagation in the CardBack
        setIsFlipped(!isFlipped);
      }}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 transform-style-3d shadow-2xl rounded-xl ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-white">
          <CardFront imageSrc={frontImage} />
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-white">
          <CardBack 
            message={message} 
            onMessageChange={onMessageChange} 
            imageSrc={backImage} 
          />
        </div>
      </div>
    </div>
  );
};
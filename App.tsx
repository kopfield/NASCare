import React, { useState, useEffect } from 'react';
import { FlipCard } from './components/FlipCard';
import { RotateCw, Mail, Download } from 'lucide-react';

export default function App() {
  const [message, setMessage] = useState("Dear [Name],\n\nYou are amazing! Thank you for all the hard work!\n\nWarm regards,\n[Your Name]");
  const [isFlipped, setIsFlipped] = useState(false);
  
  // State for custom images - using provided GitHub URLs
  const [frontImage] = useState("https://raw.githubusercontent.com/kopfield/images/main/Cover.JPG");
  const [backImage] = useState("https://raw.githubusercontent.com/kopfield/images/main/Message.JPG");

  // Load message from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedMsg = params.get('m');
    if (sharedMsg) {
      setMessage(sharedMsg);
      setIsFlipped(true); // Auto-flip to show the message when opening a shared link
    }
  }, []);

  const handleDownloadHtml = () => {
    // Generate a standalone HTML file string
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A Card For You</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Patrick+Hand&family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Quicksand', sans-serif; background-color: #f1f5f9; background-image: url('https://www.transparenttextures.com/patterns/cubes.png'); }
    .perspective-1000 { perspective: 1000px; }
    .transform-style-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .card-inner { transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
    .is-flipped { transform: rotateY(180deg); }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center p-4">
  
  <div class="text-center mb-8">
    <h1 class="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      NASCare Card
    </h1>
    <p class="text-slate-600 mt-2">Tap the card to flip!</p>
  </div>

  <div class="relative group perspective-1000 w-full max-w-[700px] aspect-[4/3] cursor-pointer" onclick="toggleFlip()">
    <div id="card" class="card-inner relative w-full h-full transform-style-3d shadow-2xl rounded-xl is-flipped">
      
      <!-- Front -->
      <div class="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-white">
        <img src="${frontImage}" class="w-full h-full object-cover object-center" alt="Cover">
      </div>

      <!-- Back -->
      <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-amber-50">
        <div class="absolute inset-0 w-full h-full z-0">
          <img src="${backImage}" class="w-full h-full object-cover object-center" alt="Background">
        </div>
        <div class="relative z-10 w-full h-full p-8 md:p-12 flex flex-col items-center justify-start pt-8 md:pt-12">
          <div class="w-full h-3/5 relative">
             <textarea readonly class="w-full h-full bg-white/80 backdrop-blur-[2px] rounded-xl p-6 resize-none 
                       border-none outline-none text-center text-slate-800 text-lg md:text-2xl font-['Indie_Flower'] 
                       leading-relaxed shadow-sm pointer-events-none">${message}</textarea>
          </div>
        </div>
      </div>

    </div>
  </div>

  <script>
    // Start flipped to show message immediately if downloaded
    const card = document.getElementById('card');
    function toggleFlip() {
      card.classList.toggle('is-flipped');
    }
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NASCare_Card.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4 font-['Quicksand'] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      
      <header className="mb-8 text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-3">
          <Mail className="text-indigo-600" /> NASCare Card
        </h1>
        <p className="text-slate-600">
          Tap the card to flip and type message.
        </p>
      </header>

      {/* Card Container */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8">
        <FlipCard 
          isFlipped={isFlipped} 
          setIsFlipped={setIsFlipped} 
          message={message} 
          onMessageChange={setMessage}
          frontImage={frontImage}
          backImage={backImage}
        />

        {/* Controls Section */}
        <div className="w-full max-w-[700px] bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
          <div className="flex flex-col gap-4">
            
            <div className="flex items-center justify-between mb-2">
               <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">Actions</label>
            </div>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors bg-indigo-50 hover:bg-indigo-100 px-6 py-4 rounded-xl"
              >
                <RotateCw size={20} />
                {isFlipped ? "Flip to Front" : "Flip to Back"}
              </button>

              <button 
                onClick={handleDownloadHtml}
                className="px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white shadow-md shadow-slate-300 transition-all active:scale-95"
                title="Download as single HTML file"
              >
                <Download size={20} />
                Download
              </button>
            </div>
            
            <p className="text-xs text-slate-400 text-center mt-2">
             Download and email to a colleague.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
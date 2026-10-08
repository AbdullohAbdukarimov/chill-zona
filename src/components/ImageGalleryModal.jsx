import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export const ImageGalleryModal = () => {
  const { modalState, closeGalleryModal } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!modalState.galleryModal || !modalState.selectedGalleryImages?.length) return null;

  const images = modalState.selectedGalleryImages;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ImageIcon className="w-5 h-5 text-orange-500" />
          <span>Fotogalereya: {currentIndex + 1} / {images.length}</span>
        </div>
        <button
          onClick={closeGalleryModal}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Gallery view ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
        />

        {/* Prev / Next buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails strip */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 px-4 overflow-x-auto py-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
              currentIndex === idx ? 'border-orange-500 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

    </div>
  );
};

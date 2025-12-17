import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

interface Car3DViewerProps {
  imageUrl: string;
  carName: string;
}

export default function Car3DViewer({ imageUrl, carName }: Car3DViewerProps) {
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotateY(prev => prev + deltaX * 0.5);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const rotate = (direction: 'left' | 'right') => {
    setRotateY(prev => prev + (direction === 'left' ? -30 : 30));
  };

  const reset = () => {
    setRotateY(0);
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
      {/* 3D Container */}
      <div 
        className="relative h-96 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ perspective: '1000px' }}
      >
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={carName}
              className="max-h-80 object-contain drop-shadow-2xl"
              draggable={false}
            />
          ) : (
            <div className="w-80 h-80 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <button
          onClick={() => rotate('left')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Rotate Left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={reset}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Reset View"
        >
          <RotateCw size={20} />
        </button>
        <button
          onClick={() => rotate('right')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Rotate Right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Instruction */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
        Drag to rotate • Click arrows to turn
      </div>
    </div>
  );
}

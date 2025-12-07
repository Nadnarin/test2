import React, { useState } from 'react';
import { ColorInfo } from '../types';
import { Copy, Check } from 'lucide-react';

interface ColorCardProps {
  color: ColorInfo;
  index: number;
}

export const ColorCard: React.FC<ColorCardProps> = ({ color, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate perceived brightness to determine text color
  const getContrastYIQ = (hexcolor: string) => {
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  };

  const textColor = getContrastYIQ(color.hex) === 'black' ? 'text-gray-900' : 'text-white';
  const subTextColor = getContrastYIQ(color.hex) === 'black' ? 'text-gray-700' : 'text-gray-200';

  return (
    <div 
      className="group relative flex flex-col rounded-3xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl h-96 md:h-[500px]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Color Area */}
      <div 
        className="h-full w-full relative transition-all duration-500 ease-in-out p-6 flex flex-col justify-between"
        style={{ backgroundColor: color.hex }}
      >
        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className={`${subTextColor} text-xs font-mono uppercase tracking-widest opacity-70`}>
            {color.name}
          </span>
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/40 transition-colors ${textColor}`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>

        <div className="space-y-1">
          <h3 className={`text-4xl font-bold font-mono tracking-tighter ${textColor}`}>
            {color.hex}
          </h3>
          <p className={`${textColor} font-semibold text-lg`}>
            {color.name}
          </p>
          <p className={`${subTextColor} text-sm line-clamp-2 md:line-clamp-none opacity-0 md:opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0`}>
            {color.description}
          </p>
        </div>
      </div>
    </div>
  );
};
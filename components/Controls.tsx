import React from 'react';
import { ColorMode, ColorCount, GeneratorOptions } from '../types';
import { Palette, Layers, RefreshCw } from 'lucide-react';

interface ControlsProps {
  options: GeneratorOptions;
  setOptions: React.Dispatch<React.SetStateAction<GeneratorOptions>>;
  onGenerate: () => void;
  loading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ options, setOptions, onGenerate, loading }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 w-full max-w-4xl border border-gray-100">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        
        {/* Count Selector */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <label className="text-gray-500 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
            <Layers size={16} />
            จำนวนสี (Color Count)
          </label>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setOptions(prev => ({ ...prev, count: 3 }))}
              className={`flex-1 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                options.count === 3 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              3 สี
            </button>
            <button
              onClick={() => setOptions(prev => ({ ...prev, count: 5 }))}
              className={`flex-1 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                options.count === 5 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              5 สี
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <label className="text-gray-500 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
            <Palette size={16} />
            รูปแบบ (Harmony)
          </label>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setOptions(prev => ({ ...prev, mode: ColorMode.CONTRAST }))}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                options.mode === ColorMode.CONTRAST 
                  ? 'bg-white text-rose-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ต่างโทน (Contrast)
            </button>
            <button
              onClick={() => setOptions(prev => ({ ...prev, mode: ColorMode.MONOCHROMATIC }))}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                options.mode === ColorMode.MONOCHROMATIC 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              โทนเดียวกัน (Mono)
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={loading}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          <RefreshCw size={20} className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'กำลังคิด...' : 'สุ่มสีใหม่'}
        </button>
      </div>
    </div>
  );
};
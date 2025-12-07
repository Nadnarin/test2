import React, { useState, useEffect } from 'react';
import { generatePalette } from './services/geminiService';
import { PaletteData, ColorMode, GeneratorOptions } from './types';
import { Controls } from './components/Controls';
import { ColorCard } from './components/ColorCard';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [options, setOptions] = useState<GeneratorOptions>({
    count: 5,
    mode: ColorMode.CONTRAST,
  });

  const [palette, setPalette] = useState<PaletteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPalette = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generatePalette(options.count, options.mode);
      setPalette(data);
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <header className="text-center mb-10 mt-4 space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 animate-fade-in-up">
            <Sparkles size={16} />
            <span>Powered by Google Gemini 2.5</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 pb-2">
            Smart Palette Generator
          </h1>
          <p className="text-gray-500 text-lg">
            ค้นหาคู่สีที่ใช่ ด้วยพลัง AI อัจฉริยะ
          </p>
        </header>

        {/* Controls */}
        <Controls 
          options={options} 
          setOptions={setOptions} 
          onGenerate={fetchPalette}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl mb-8 border border-red-100">
            {error}
          </div>
        )}

        {/* Content Area */}
        <div className="w-full">
          {loading ? (
             // Loading Skeleton
             <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full h-96 md:h-[500px]">
               {Array.from({ length: options.count }).map((_, i) => (
                 <div 
                   key={i} 
                   className="bg-gray-200 rounded-3xl animate-pulse h-full w-full"
                   style={{ animationDelay: `${i * 150}ms` }}
                 />
               ))}
             </div>
          ) : palette ? (
            <div className="animate-fade-in space-y-8">
              {/* Palette Info */}
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold text-gray-800">{palette.paletteName}</h2>
                <p className="text-gray-500 italic">"{palette.vibe}"</p>
              </div>

              {/* Color Grid */}
              <div 
                className={`grid grid-cols-1 gap-4 w-full ${
                  options.count === 3 ? 'md:grid-cols-3' : 'md:grid-cols-5'
                }`}
              >
                {palette.colors.map((color, index) => (
                  <ColorCard key={`${color.hex}-${index}`} color={color} index={index} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <footer className="mt-20 text-gray-400 text-sm text-center">
          &copy; {new Date().getFullYear()} Smart Palette Generator. Create beautiful colors with AI.
        </footer>
      </div>
    </div>
  );
};

export default App;
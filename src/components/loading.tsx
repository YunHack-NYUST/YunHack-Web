'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-8">
          <div className="absolute inset-0 rounded-full bg-[#00beB2]/10 filter blur-xl"></div>
          <div className="relative">
            <Image
              src="/YunHack.png"
              alt="YunHack Logo"
              width={160}
              height={160}
              className={`transition-all duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-white">
          <span className={`transition-all duration-700 delay-200 ${showText ? 'opacity-100' : 'opacity-0'}`}>
            雲科資安社 <span className="text-[#00beB2]">YunHack</span>
          </span>
        </h1>
        
        <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-[#00beB2] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-zinc-500 text-sm">
          <span className={`transition-all duration-500 delay-300 ${showText ? 'opacity-100' : 'opacity-0'}`}>
            {progress < 100 ? '資源載入中...' : '準備就緒'}
          </span>
        </p>
      </div>
      
      <div className="absolute bottom-4 text-center text-zinc-600 text-xs">
        <p>© 2025 雲科資安社 YunHack. 探索・學習・保護</p>
      </div>
    </div>
  );
}

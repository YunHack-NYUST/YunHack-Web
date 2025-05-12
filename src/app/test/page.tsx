'use client';

import { useEffect, useState } from 'react';
import Loading from '@/components/Loading'; // 假設您將 loading 移到了 components 目錄

export default function TestLoadingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 5秒後關閉 loading 頁面
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">載入完成！</h1>
      <p className="text-xl">這是測試 Loading 頁面後顯示的內容</p>
      <button 
        onClick={() => setIsLoading(true)} 
        className="mt-8 px-6 py-3 bg-[#00beB2] text-black rounded-lg font-medium"
      >
        再次顯示 Loading
      </button>
    </div>
  );
}

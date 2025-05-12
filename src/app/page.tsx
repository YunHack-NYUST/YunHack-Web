'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EnhancedMouseGlowEffect from '@/components/EnhancedMouseGlowEffect';

// 導航連結
const navLinks = [
  { name: '首頁', href: '/' },
  { name: '關於我們', href: '/about' },
  { name: '活動紀實', href: '/events' },
  { name: '教學資源', href: '/resources' },
  { name: '聯絡我們', href: '/contact' },
];

// 特色活動
const featuredEvents = [
  {
    title: 'CTF 資安競賽',
    description: '參與全國性的駭客技術競賽，挑戰各種資安問題並獲得實戰經驗。',
    icon: '🏆',
  },
  {
    title: '滲透測試工作坊',
    description: '學習專業的滲透測試技巧，從網路安全專家身上獲取實用知識。',
    icon: '🔍',
  },
  {
    title: '資安講座系列',
    description: '邀請業界專家分享最新資安趨勢與技術，擴展您的視野。',
    icon: '🎤',
  },
  {
    title: '程式設計訓練',
    description: '強化程式設計能力，學習多種編程語言與資安相關的程式開發。',
    icon: '💻',
  },
];

export default function Home() {
  // 用於追蹤是否在客戶端渲染
  const [isClient, setIsClient] = useState(false);
  // 用於追蹤滑鼠位置
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // 在組件載入後設置為客戶端渲染模式
  useEffect(() => {
    setIsClient(true);
    
    // 設置滑鼠位置監聽
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // 計算元素的不透明度和效果
  const calculateElementStyle = (elementId: number) => {
    if (!isClient) return { opacity: 0.7, boxShadow: 'none', transform: 'scale(1)' };
    
    // 元素的假設位置（實際應用中可能需要更精確的方法）
    const elements = [
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 }, // 標題和 logo
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.6 }, // 左側活動卡片
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.6 }, // 中間活動卡片 
      { x: window.innerWidth * 0.75, y: window.innerHeight * 0.6 }, // 右側活動卡片
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.85 }, // 底部
    ];
    
    if (elementId >= elements.length) return { opacity: 0.7, boxShadow: 'none', transform: 'scale(1)' };
    
    const element = elements[elementId];
    
    // 計算距離
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - element.x, 2) + 
      Math.pow(mousePosition.y - element.y, 2)
    );
    
    // 閾值
    const threshold = 350;
    
    if (distance < threshold) {
      // 計算不透明度 - 距離越近越不透明
      const opacity = 1 - (distance / threshold) * 0.3;
      
      // 添加發光效果
      const glowIntensity = (1 - distance / threshold) * 15;
      
      // 稍微放大
      const scale = 1 + (1 - distance / threshold) * 0.05;
      
      return { 
        opacity: Math.max(0.7, opacity), 
        boxShadow: `0 0 ${glowIntensity}px rgba(0, 190, 178, 0.4)`,
        transform: `scale(${scale})`
      };
    } else {
      // 恢復默認狀態
      return { opacity: 0.7, boxShadow: 'none', transform: 'scale(1)' };
    }
  };

  // 計算活動卡片的樣式
  const calculateCardStyle = (index: number) => {
    if (!isClient) return { opacity: 0.85, boxShadow: 'none', transform: 'scale(1)' };
    
    // 計算位置
    const cardWidth = 300; // 假設卡片寬度
    const gap = 20; // 卡片間隔
    const totalWidth = featuredEvents.length * cardWidth + (featuredEvents.length - 1) * gap;
    const startX = (window.innerWidth - totalWidth) / 2;
    
    const cardX = startX + index * (cardWidth + gap) + cardWidth / 2;
    const cardY = window.innerHeight * 0.65;
    
    // 計算距離
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - cardX, 2) + 
      Math.pow(mousePosition.y - cardY, 2)
    );
    
    // 閾值
    const threshold = 300;
    
    if (distance < threshold) {
      // 計算不透明度
      const opacity = 1 - (distance / threshold) * 0.15;
      
      // 添加發光效果
      const glowIntensity = (1 - distance / threshold) * 15;
      
      // 放大
      const scale = 1 + (1 - distance / threshold) * 0.08;
      
      return { 
        opacity: Math.max(0.85, opacity), 
        boxShadow: `0 0 ${glowIntensity}px rgba(0, 190, 178, 0.4)`,
        transform: `scale(${scale})`
      };
    } else {
      return { opacity: 0.85, boxShadow: 'none', transform: 'scale(1)' };
    }
  };

  const headerStyle = calculateElementStyle(0);
  const footerStyle = calculateElementStyle(4);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <EnhancedMouseGlowEffect
        glowColor="rgba(0, 190, 178, 0.4)"
        glowSize={700}
        blurAmount={100}
      >
        {/* 導航欄 */}
        <nav className="fixed top-0 w-full z-50 bg-zinc-900 bg-opacity-80 backdrop-blur-md border-b border-zinc-800">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image 
                src="/YunHack.png" 
                alt="YunHack Logo" 
                width={40} 
                height={40} 
                className="rounded-md"
              />
              <span className="text-xl font-bold text-white">
                雲科資安社 <span className="text-[#00beB2]">YunHack</span>
              </span>
            </div>
            <ul className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-200 hover:text-[#00beB2] transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="md:hidden text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* 主要內容 */}
        <div className="container mx-auto px-4 pt-24 pb-16">
          {/* 英雄區塊 */}
          <div 
            className="text-center py-16 mb-12" 
            style={{
              opacity: headerStyle.opacity,
              boxShadow: headerStyle.boxShadow,
              transform: headerStyle.transform,
              transition: 'all 0.3s ease'
            }}
          >
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-[#00beB2] opacity-10 rounded-full transform scale-150"></div>
                <Image 
                  src="/YunHack.png" 
                  alt="YunHack Logo" 
                  width={220} 
                  height={220} 
                  className="relative z-10"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              雲科資安社 <span className="text-[#00beB2]">YunHack</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              探索資訊安全的奧秘，培養網路防禦的實力，成為捍衛數位世界的駭客英雄
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/about" className="px-6 py-3 bg-[#00beB2] hover:bg-[#00a89d] text-black font-medium rounded-lg transition-colors duration-300">
                了解更多
              </Link>
              <Link href="/events" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors duration-300 border border-zinc-700">
                查看活動
              </Link>
            </div>
          </div>

          {/* 特色活動區塊 */}
          <div className="my-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              特色活動與<span className="text-[#00beB2]">學習機會</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event, index) => (
                <div 
                  key={event.title}
                  className="relative overflow-hidden rounded-xl p-6 border border-zinc-800 backdrop-blur-sm"
                  style={{
                    backgroundColor: 'rgba(24, 24, 27, 0.8)',
                    opacity: calculateCardStyle(index).opacity,
                    boxShadow: calculateCardStyle(index).boxShadow,
                    transform: calculateCardStyle(index).transform,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00beB2]/5 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{event.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-300 mb-4">
                      {event.description}
                    </p>
                    <Link href="/events" className="text-[#00beB2] hover:text-[#00a89d] font-medium">
                      查看詳情 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 最新資訊 */}
          <div className="my-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              最新<span className="text-[#00beB2]">資安消息</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2 bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-[#00beB2]/50 transition-colors duration-300">
                <span className="inline-block px-3 py-1 bg-[#00beB2]/10 text-[#00beB2] rounded-full text-sm mb-4">
                  最新活動
                </span>
                <h3 className="text-2xl font-bold mb-3">第五屆全國大專院校資安搶旗競賽</h3>
                <p className="text-gray-300 mb-4">
                  我們將組隊參加今年的全國資安競賽，歡迎對CTF有興趣的同學加入我們的培訓計畫，從基礎開始學習各種資安技能。
                </p>
                <div className="flex items-center text-gray-400 text-sm">
                  <span>2025年5月10日</span>
                  <span className="mx-2">•</span>
                  <span>由 YunHack 團隊發布</span>
                </div>
              </div>
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-[#00beB2]/50 transition-colors duration-300">
                <span className="inline-block px-3 py-1 bg-[#00beB2]/10 text-[#00beB2] rounded-full text-sm mb-4">
                  技術分享
                </span>
                <h3 className="text-xl font-bold mb-3">進階滲透測試工作坊</h3>
                <p className="text-gray-300 mb-4">
                  本月將舉辦一系列進階滲透測試工作坊，探討最新的攻擊手法與防禦策略，實戰演練各種漏洞利用技術。
                </p>
                <div className="flex items-center text-gray-400 text-sm">
                  <span>2025年5月5日</span>
                  <span className="mx-2">•</span>
                  <span>由 資安講師 李教授 發布</span>
                </div>
              </div>
            </div>
          </div>

          {/* 加入我們 */}
          <div 
            className="text-center py-16 mt-16 rounded-xl bg-zinc-900 border border-zinc-800"
            style={{
              opacity: footerStyle.opacity,
              boxShadow: footerStyle.boxShadow,
              transform: footerStyle.transform,
              transition: 'all 0.3s ease'
            }}
          >
            <h2 className="text-3xl font-bold mb-6">加入<span className="text-[#00beB2]">雲科資安社</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              不管您是資安新手還是有經驗的駭客，我們都歡迎您加入我們的社群！
            </p>
            <Link href="/contact" className="px-8 py-4 bg-[#00beB2] hover:bg-[#00a89d] text-black rounded-lg font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              立即加入
            </Link>
          </div>
        </div>

        {/* 頁腳 */}
        <footer className="bg-zinc-900 border-t border-zinc-800 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <Image 
                  src="/YunHack.png" 
                  alt="YunHack Logo" 
                  width={40} 
                  height={40} 
                  className="rounded-md mr-3"
                />
                <div>
                  <p className="font-bold text-white">雲科資安社 <span className="text-[#00beB2]">YunHack</span></p>
                  <p className="text-sm text-gray-400">探索・學習・保護</p>
                </div>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-[#00beB2] transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00beB2] transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00beB2] transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00beB2] transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} 雲科資安社 YunHack. 版權所有。</p>
            </div>
          </div>
        </footer>
      </EnhancedMouseGlowEffect>
    </main>
  );
}

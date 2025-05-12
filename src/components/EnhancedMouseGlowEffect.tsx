"use client";

import React, { useEffect, useState, ReactNode } from 'react';

interface MouseGlowEffectProps {
  children?: ReactNode;
  glowColor?: string;
  glowSize?: number;
  glowOpacity?: number;
  blurAmount?: number;
}

const EnhancedMouseGlowEffect: React.FC<MouseGlowEffectProps> = ({
  children,
  glowColor = 'rgba(62, 152, 199, 0.8)',
  glowSize = 600,
  glowOpacity = 0.8,
  blurAmount = 80,
}) => {
  // 初始化滑鼠位置在中心點 (初始值為0,0，稍後會更新)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 設置初始滑鼠位置到窗口中心點
    const setInitialPosition = () => {
      if (typeof window !== 'undefined') {
        setMousePosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        });
      }
    };

    // 監聽滑鼠移動事件
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // 只在客戶端運行
    if (typeof window !== 'undefined') {
      // 設置初始位置
      setInitialPosition();

      // 添加滑鼠移動監聽
      window.addEventListener('mousemove', handleMouseMove);

      // 監聽窗口大小變化，重新設置中心點
      window.addEventListener('resize', setInitialPosition);
    }

    // 組件卸載時清除事件監聽器
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', setInitialPosition);
      }
    };
  }, []);

  // 從顏色提取RGB值用於徑向漸變
  const extractRgbFromColor = (color: string) => {
    if (color.startsWith('rgba')) {
      return color.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(', ');
    }
    if (color.startsWith('rgb')) {
      return color.replace('rgb(', '').replace(')', '').split(',').join(', ');
    }
    // 如果是十六進制或其他格式，這裡需要更複雜的轉換
    return '62, 152, 199'; // 默認值
  };

  const rgbValues = extractRgbFromColor(glowColor);
  const gradientColor = `rgba(${rgbValues}, ${glowOpacity})`;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 滑鼠發光效果 */}
      <div
        className="fixed pointer-events-none left-0 top-0 w-full h-full z-50"
      >
        <div
          className="absolute rounded-full"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            background: `radial-gradient(circle, ${gradientColor} 0%, rgba(${rgbValues}, 0) 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: `blur(${blurAmount}px)`,
            transition: 'transform 0.05s ease-out',
          }}
        />
      </div>

      {/* 頁面內容 */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default EnhancedMouseGlowEffect;

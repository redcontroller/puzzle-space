'use client';

import { useEffect, useState } from 'react';
import { Building2, Sparkles } from 'lucide-react';

export default function SplashScreen() {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 300), // 로고 페이드인
      setTimeout(() => setAnimationStep(2), 800), // 텍스트 애니메이션
      setTimeout(() => setAnimationStep(3), 1500), // 로딩 바 시작
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 배경 애니메이션 요소들 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 dark:bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 dark:bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/10 dark:bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-white/25 dark:bg-white/35 rounded-full animate-pulse"></div>
      </div>

      {/* 메인 로고 영역 */}
      <div className="flex flex-col items-center space-y-8 z-10">
        {/* 로고 아이콘 */}
        <div className={`transition-all duration-1000 ${animationStep >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 dark:bg-white/30 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-white/10 dark:bg-white/20 backdrop-blur-sm rounded-full p-6 sm:p-8 border border-white/20 dark:border-white/30">
              <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 dark:text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>

        {/* 서비스명 */}
        <div className={`text-center transition-all duration-1000 delay-300 ${animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2 tracking-wide">
            Puzzle
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 dark:from-yellow-400 dark:to-orange-500 bg-clip-text text-transparent ml-1 sm:ml-2">Space</span>
          </h1>
          <p className="text-base sm:text-lg font-light tracking-wider text-white/80 dark:text-white/90">공간을 연결하다</p>
        </div>

        {/* 로딩 인디케이터 */}
        <div className={`transition-all duration-500 delay-700 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col items-center space-y-4">
            {/* 프로그레스 바 */}
            <div className="w-36 sm:w-48 h-1 bg-white/20 dark:bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 dark:from-yellow-400 dark:to-orange-500 rounded-full animate-loading-bar"></div>
            </div>

            {/* 로딩 텍스트 */}
            <p className="text-xs sm:text-sm text-white/60 dark:text-white/70 animate-pulse">공간을 불러오는 중...</p>
          </div>
        </div>
      </div>

      {/* 하단 브랜딩 */}
      <div className="absolute bottom-8 text-center">
        <p className="text-[10px] sm:text-xs text-white/40 dark:text-white/50">퍼즐처럼 완벽한 공간 매칭 플랫폼</p>
      </div>
    </div>
  );
}

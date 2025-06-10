'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function MobileHeader() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // 컴포넌트가 마운트된 후에만 테마 관련 기능 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  // 테마 토글 함수
  const toggleTheme = () => {
    if (mounted) {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4" style={{ height: 'var(--sizes-header-height)', padding: '0 var(--sizes-layout-padding)' }}>
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Puzzle Space</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
          {/* 테마 토글 버튼 */}
          <Button variant="outline" size="icon" onClick={toggleTheme} className="h-8 w-8 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            {mounted && (resolvedTheme === 'dark' ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-blue-700" />)}
            <span className="sr-only">테마 변경</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

'use client';

import type React from 'react';

import { usePathname } from 'next/navigation';
import { MobileHeader } from '@/widgets/header/ui/mobile-header';
import { MobileNavigation } from '@/widgets/navigation/ui/mobile-navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  // 홈 페이지에서만 헤더 표시
  const showHeader = pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col mx-auto" style={{ minWidth: 'var(--sizes-min-width)', maxWidth: 'var(--sizes-max-width)' }}>
      {/* 헤더 - 홈 페이지에서만 표시 */}
      {showHeader && <MobileHeader />}

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* 하단 네비게이션 바 */}
      <MobileNavigation />
    </div>
  );
}

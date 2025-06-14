'use client'

import type React from 'react'

import { usePathname } from 'next/navigation'
import { MobileHeader } from '@/shared/ui/mobile-header'
import { MobileNavigation } from '@/widgets/navigation/ui/mobile-navigation'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname() || '/'

  // 헤더를 표시할 페이지들 정의
  const showHeader = ['/', '/request', '/profile', '/settings'].includes(
    pathname
  )

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col mx-auto"
      style={{
        minWidth: 'var(--sizes-min-width)',
        maxWidth: 'var(--sizes-max-width)',
      }}
    >
      {/* 헤더 - pathname에 따라 자동으로 적절한 헤더 렌더링 */}
      {showHeader && <MobileHeader />}

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* 하단 네비게이션 바 */}
      <MobileNavigation />
    </div>
  )
}

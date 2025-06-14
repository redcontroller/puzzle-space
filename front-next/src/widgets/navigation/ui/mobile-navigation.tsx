'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, MessageSquarePlus, Map, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export function MobileNavigation() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  const navigationItems = [
    { id: 'home', icon: Home, label: '홈', path: '/' },
    { id: 'request', icon: MessageSquarePlus, label: '요청', path: '/request' },
    { id: 'map', icon: Map, label: '지도', path: '/map' },
    { id: 'profile', icon: User, label: '내정보', path: '/profile' },
  ]

  // 스플래시 화면 감지
  useEffect(() => {
    // 홈 페이지에서 스플래시가 표시되는 동안 네비게이션 숨기기
    if (pathname === '/') {
      const checkSplash = () => {
        // 스플래시 화면 요소가 있는지 확인
        const splashElement = document.querySelector('[data-splash="true"]')
        setIsVisible(!splashElement)
      }

      // 초기 체크
      checkSplash()

      // MutationObserver로 DOM 변화 감지
      const observer = new MutationObserver(checkSplash)
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-splash'],
      })

      // 3초 후에는 확실히 표시 (스플래시 시간과 동일)
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)

      return () => {
        observer.disconnect()
        clearTimeout(timer)
      }
    } else {
      setIsVisible(true)
    }
  }, [pathname])

  // 네비게이션이 보이지 않을 때는 렌더링하지 않음
  if (!isVisible) {
    return null
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mx-auto z-50"
      style={{
        height: 'var(--sizes-nav-height)',
        maxWidth: 'var(--sizes-max-width)',
        padding: '8px var(--sizes-layout-padding)',
      }}
    >
      <div className="flex justify-around h-full">
        {navigationItems.map(item => {
          const isActive = pathname === item.path

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex flex-col items-center justify-center space-y-1 px-3 rounded-lg transition-colors flex-1 ${isActive ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              aria-label={`${item.label} 페이지로 이동`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

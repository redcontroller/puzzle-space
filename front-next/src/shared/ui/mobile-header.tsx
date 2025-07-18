'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import {
  Building2,
  Bell,
  Moon,
  Sun,
  ArrowLeft,
  Settings,
  User,
  SettingsIcon,
  MessageSquarePlus,
} from 'lucide-react'
import { useTheme } from 'next-themes'

interface HeaderConfig {
  title?: string
  showBackButton?: boolean
  showThemeToggle?: boolean
  showNotifications?: boolean
  showSettings?: boolean
  showLogo?: boolean
  icon?: React.ReactNode
}

const getHeaderConfig = (pathname: string): HeaderConfig => {
  switch (pathname) {
    case '/':
      return {
        showLogo: true,
        showThemeToggle: true,
        showNotifications: true,
        showSettings: false,
        showBackButton: false,
      }
    case '/request':
      return {
        title: '공간 요청',
        icon: <MessageSquarePlus className="h-6 w-6 text-blue-600" />,
        showBackButton: false,
        showThemeToggle: true,
        showNotifications: true,
        showSettings: false,
      }
    case '/profile':
      return {
        title: '내정보',
        icon: <User className="h-6 w-6 text-blue-600" />,
        showBackButton: false,
        showThemeToggle: true,
        showNotifications: true,
        showSettings: true,
      }
    case '/settings':
      return {
        title: '앱 설정',
        icon: <SettingsIcon className="h-6 w-6 text-blue-600" />,
        showBackButton: true,
        showThemeToggle: true,
        showNotifications: true,
        showSettings: false,
      }
    default:
      return {
        showBackButton: true,
        showThemeToggle: true,
        showNotifications: true,
        showSettings: false,
      }
  }
}

export function MobileHeader() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname() || '/'

  const config = getHeaderConfig(pathname)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 스플래시 화면 감지 (홈 페이지에서만)
  useEffect(() => {
    if (pathname === '/') {
      const checkSplash = () => {
        const splashElement = document.querySelector('[data-splash="true"]')
        setIsVisible(!splashElement)
      }

      checkSplash()

      const observer = new MutationObserver(checkSplash)
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-splash'],
      })

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

  const toggleTheme = () => {
    if (mounted) {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }
  }

  const handleBack = () => {
    router.back()
  }

  // 헤더가 보이지 않을 때는 렌더링하지 않음 (홈 페이지 스플래시 시에만)
  if (pathname === '/' && !isVisible) {
    return null
  }

  // 헤더 내용 구성
  const renderLeftContent = () => {
    if (config.showBackButton) {
      return (
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로가기</span>
          </Button>
          {config.title && (
            <div className="flex items-center gap-2">
              {config.icon}
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {config.title}
              </h1>
            </div>
          )}
        </div>
      )
    }

    // 홈 페이지 로고
    if (config.showLogo) {
      return (
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          aria-label="홈으로 이동"
        >
          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Puzzle Space
          </span>
        </Link>
      )
    }

    // 기본 타이틀
    if (config.title) {
      return (
        <div className="flex items-center gap-2">
          {config.icon}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {config.title}
          </h1>
        </div>
      )
    }

    return null
  }

  const renderRightContent = () => {
    return (
      <div className="flex items-center space-x-2">
        {/* 알림 버튼 */}
        {config.showNotifications && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="알림"
          >
            <Bell className="h-5 w-5" size={32} />
          </Button>
        )}

        {/* 테마 토글 버튼 */}
        {config.showThemeToggle && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            aria-label="테마 변경"
          >
            {mounted &&
              (resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-700" />
              ))}
          </Button>
        )}

        {/* 설정 버튼 */}
        {config.showSettings && (
          <Link href="/settings">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11"
              aria-label="설정"
            >
              <Settings className="!w-6 !h-6" size={32} />
            </Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <header
      className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      style={{
        height: 'var(--sizes-header-height)',
        padding: '0 var(--sizes-layout-padding)',
      }}
    >
      <div className="flex items-center justify-between h-full">
        {renderLeftContent()}
        {renderRightContent()}
      </div>
    </header>
  )
}

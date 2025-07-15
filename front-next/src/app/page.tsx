'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SplashScreen from '@/components/splash-screen'
import { HomePage } from '@/pages/home/ui/home-page'

export default function Page() {
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // localStorage에서 스플래시 표시 여부 확인
    const hasSeenSplash = localStorage.getItem('hasSeenSplash')

    // 최초 방문이거나 localStorage가 없는 경우에만 스플래시 표시
    if (hasSeenSplash) {
      setShowSplash(false)
    } else {
      // 스플래시 표시 후 localStorage에 표시 여부 저장
      const timer = setTimeout(() => {
        setShowSplash(false)
        localStorage.setItem('hasSeenSplash', 'true')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [router])

  return (
    <>
      {/* 스플래시 화면 - 조건부 렌더링으로 전체화면 표시 */}
      {showSplash && (
        <div
          className="absolute inset-0 z-[9999] bg-white dark:bg-gray-900"
          data-splash="true"
        >
          <SplashScreen />
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <main
        className={`container transition-opacity duration-500 ${
          showSplash ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <HomePage />
      </main>
    </>
  )
}

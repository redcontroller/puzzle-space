'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SplashScreen from '@/components/splash-screen'
import { HomePage } from '@/pages/home/ui/home-page'

export default function Page() {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // localStorage에서 스플래시 표시 여부 확인
    const hasSeenSplash = localStorage.getItem('hasSeenSplash')

    // 최초 방문이거나 localStorage가 없는 경우에만 스플래시 표시
    if (hasSeenSplash) {
      setShowSplash(false)
      setIsLoading(false)
    } else {
      // 스플래시 표시 후 localStorage에 표시 여부 저장
      const timer = setTimeout(() => {
        setShowSplash(false)
        localStorage.setItem('hasSeenSplash', 'true')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [router])

  // 스플래시가 끝난 후 로딩 상태 해제
  useEffect(() => {
    if (!showSplash) {
      setIsLoading(false)
    }
  }, [showSplash])

  // 스플래시 화면일 때는 레이아웃 없이 전체 화면으로 표시
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[9999]">
        <SplashScreen />
      </div>
    )
  }

  // 로딩 중일 때는 빈 화면 표시 (깜빡임 방지)
  if (isLoading) {
    return null
  }

  return (
    <main className="container">
      <HomePage />
    </main>
  )
}

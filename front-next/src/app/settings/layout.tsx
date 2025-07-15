import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '설정 - Puzzle Space',
  description: '앱 설정을 관리하세요',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

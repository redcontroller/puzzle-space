import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '내정보 - Puzzle Space',
  description: '프로필과 설정을 관리하세요',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

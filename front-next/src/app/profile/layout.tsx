import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '공간 요청 - Puzzle Space',
  description: '원하는 공간을 요청하고 맞춤 매칭을 받아보세요',
}

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

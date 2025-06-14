import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '지도로 찾기 - Puzzle Space',
  description: '지도에서 인근 공유 공간을 찾아보세요',
}

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

'use client'

import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { Settings, User, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProfileHeaderProps {
  showBackButton?: boolean
  title?: string
}

export function ProfileHeader({
  showBackButton = false,
  title = '내정보',
}: ProfileHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      style={{
        paddingTop: 'var(--sizes-layout-padding)',
        paddingLeft: 'var(--sizes-layout-padding)',
        paddingRight: 'var(--sizes-layout-padding)',
        paddingBottom: 'var(--sizes-layout-padding)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">뒤로가기</span>
            </Button>
          )}
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>
        </div>
        <Link href="/settings">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="설정"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

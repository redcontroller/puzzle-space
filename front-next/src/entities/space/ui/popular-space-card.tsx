'use client'

import type { PopularSpaceItemProps } from '@/shared/types/space-card'
import { cn } from '@/shared/lib/utils'

export function PopularSpaceCard({
  space,
  onClick,
  className,
}: PopularSpaceItemProps) {
  const handleClick = () => {
    onClick?.(space)
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold">
          {space.rank}
        </div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {space.name}
        </span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {space.views} views
      </span>
    </div>
  )
}

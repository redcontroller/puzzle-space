'use client'

import type React from 'react'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Clock, Heart, Layers, Maximize2, ImageIcon } from 'lucide-react'
import type { RecentSpaceCardProps } from '@/shared/types/space-card'
import { cn } from '@/shared/lib/utils'
import { getSpaceImage } from '@/shared/lib/space-images'

export function RecentSpaceCard({
  space,
  onClick,
  className,
}: RecentSpaceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (space?.isFavorite !== undefined) {
      setIsFavorite(space.isFavorite)
    }
  }, [space])

  const handleClick = () => {
    onClick?.(space)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(prev => !prev)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  return (
    <Card
      key={space.id}
      className={cn(
        'flex-shrink-0 w-40 hover:shadow-md transition-shadow cursor-pointer',
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-2">
        <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
          {imageError ? (
            // 이미지 로딩 실패 시 플레이스홀더
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <ImageIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
          ) : (
            <>
              {imageLoading && (
                // 로딩 중 스켈레톤
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
              )}
              <Image
                src={getSpaceImage(space?.imageType) || '/placeholder.svg'}
                alt={space.name}
                fill
                sizes="(max-width: 768px) 100vw, 160px"
                className={cn(
                  'object-cover transition-opacity duration-300',
                  imageLoading ? 'opacity-0' : 'opacity-100'
                )}
                onError={handleImageError}
                onLoad={handleImageLoad}
                quality={85}
              />
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute top-1 right-1 h-6 w-6 bg-white/70 dark:bg-gray-800/70 rounded-full backdrop-blur-sm z-10',
              isFavorite ? 'text-red-500' : 'text-gray-500'
            )}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? '찜 해제하기' : '찜하기'}
          >
            <Heart
              className={cn(
                'h-3 w-3 transition-colors',
                isFavorite ? 'fill-current text-red-500' : ''
              )}
            />
          </Button>
        </div>

        <h4 className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2 mb-1 min-h-[2rem]">
          {space.name}
        </h4>

        {(space.floor || space.area) && (
          <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400 mb-1 min-h-[1rem]">
            {space.floor && (
              <div className="flex items-center mr-2 min-w-0">
                <Layers className="h-2 w-2 mr-0.5 flex-shrink-0" />
                <span className="truncate">{space.floor}</span>
              </div>
            )}
            {space.area && (
              <div className="flex items-center overflow-hidden min-w-0">
                <Maximize2 className="h-2 w-2 mr-0.5 flex-shrink-0" />
                <span className="truncate">{space.area}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{space.viewedAt}</span>
        </div>
      </CardContent>
    </Card>
  )
}

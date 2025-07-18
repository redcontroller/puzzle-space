'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import {
  MapPin,
  Star,
  Heart,
  Zap,
  Crown,
  Sparkles,
  Layers,
  Maximize2,
  ImageIcon,
} from 'lucide-react'
import type { SpaceItemProps } from '@/shared/types/space-card'
import type { AdSpace } from '@/shared/types/space'
import { cn } from '@/shared/lib/utils'
import { getSpaceImage } from '@/shared/lib/space-images'

export function SpaceCard({
  space,
  onSpaceClick,
  onFavoriteClick,
  onAdClick,
  className,
  showFavoriteButton = true,
}: SpaceItemProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  // 타입 가드를 사용하여 AdSpace인지 확인
  const isAd = !!space && 'adType' in space
  const adSpace = isAd ? (space as AdSpace) : null

  useEffect(() => {
    if (space?.isFavorite !== undefined) {
      setIsFavorite(space.isFavorite)
    }
  }, [space])

  if (!space) {
    return null
  }

  const handleCardClick = () => {
    if (isAd && onAdClick && adSpace) {
      onAdClick(adSpace)
    }
    onSpaceClick?.(space)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(prev => !prev)
    onFavoriteClick?.(space)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  const getAdIcon = () => {
    if (!isAd) return null
    switch (adSpace!.adType) {
      case 'premium':
        return <Crown className="h-2 w-2 mr-1" />
      case 'featured':
        return <Sparkles className="h-2 w-2 mr-1" />
      default:
        return <Zap className="h-2 w-2 mr-1" />
    }
  }

  const getAdBadgeColor = () => {
    if (!isAd) return ''
    switch (adSpace!.adType) {
      case 'premium':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
      case 'featured':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
      default:
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
    }
  }

  const getCardBorderColor = () => {
    if (!isAd) return ''
    switch (adSpace!.adType) {
      case 'premium':
        return 'ring-2 ring-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
      case 'featured':
        return 'ring-2 ring-blue-400 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
      default:
        return 'ring-2 ring-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
    }
  }

  return (
    <Card
      className={cn(
        'p-0 overflow-hidden hover:shadow-md transition-all cursor-pointer',
        'hover:shadow-lg transform hover:scale-[1.02]',
        isAd && getCardBorderColor(),
        className
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative flex-shrink-0">
            <div className="w-[105px] h-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-l-lg">
              {imageError ? (
                // 이미지 로딩 실패 시 플레이스홀더
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <ImageIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              ) : (
                <figure className="relative w-full h-full">
                  {imageLoading && (
                    // 로딩 중 스켈레톤
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
                  )}
                  <Image
                    src={getSpaceImage(space.imageType) || '/placeholder.svg'}
                    alt={space.title}
                    fill
                    sizes="105px"
                    className={cn(
                      'absolute inset-0 object-cover transition-opacity duration-300',
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    )}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    priority={isAd}
                    quality={85}
                  />
                </figure>
              )}
            </div>

            {isAd ? (
              <Badge
                className={cn(
                  'absolute top-1 left-1 text-xs text-white font-bold z-10',
                  getAdBadgeColor()
                )}
              >
                {getAdIcon()}
                {adSpace!.adBadge || 'AD'}
              </Badge>
            ) : space.isHot ? (
              <Badge className="absolute top-1 left-1 text-xs bg-red-500 hover:bg-red-600 z-10">
                HOT
              </Badge>
            ) : space.isNew ? (
              <Badge className="absolute top-1 left-1 text-xs bg-green-500 hover:bg-green-600 z-10">
                NEW
              </Badge>
            ) : null}
          </div>

          <div className="flex-1 p-3 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3
                className={cn(
                  'text-sm text-gray-900 dark:text-white line-clamp-1 flex-1 mr-2',
                  isAd ? 'font-semibold' : 'font-medium'
                )}
              >
                {space.title}
              </h3>
              {showFavoriteButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-6 w-6 flex-shrink-0',
                    isFavorite
                      ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                      : 'hover:bg-red-50 dark:hover:bg-red-900/20'
                  )}
                  onClick={handleFavoriteClick}
                  aria-label={isFavorite ? '찜 해제하기' : '찜하기'}
                >
                  <Heart
                    className={cn(
                      'h-3 w-3 transition-colors',
                      isFavorite
                        ? 'fill-current text-red-500'
                        : 'hover:text-red-500'
                    )}
                  />
                </Button>
              )}
            </div>

            {isAd && adSpace!.promotionText && (
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1 line-clamp-1">
                {adSpace!.promotionText}
              </p>
            )}

            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate flex-1">{space.location}</span>
              <div className="flex items-center ml-2 flex-shrink-0">
                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                <span>{space.rating}</span>
              </div>
            </div>

            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
              {space.floor && (
                <div className="flex items-center mr-2">
                  <Layers className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{space.floor}</span>
                </div>
              )}
              {space.area && (
                <div className="flex items-center">
                  <Maximize2 className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{space.area}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-end min-w-0 flex-1">
                <span
                  className={cn(
                    'text-sm font-semibold truncate',
                    isAd
                      ? 'text-purple-600 dark:text-purple-400 font-bold'
                      : 'text-blue-600 dark:text-blue-400'
                  )}
                >
                  {space.price}
                </span>
                {isAd && adSpace!.originalPrice && (
                  <span className="text-xs text-gray-400 line-through truncate">
                    {adSpace!.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex space-x-1 flex-shrink-0 ml-2">
                {space.tags?.slice(0, 2).map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      'text-xs px-1 py-0 max-w-[60px] truncate',
                      isAd
                        ? 'border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300'
                        : 'dark:border-gray-600 dark:text-gray-300'
                    )}
                    title={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

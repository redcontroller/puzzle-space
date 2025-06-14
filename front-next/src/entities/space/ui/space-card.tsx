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
} from 'lucide-react'
import type { SpaceItemProps } from '@/shared/types/space-card'
import { cn } from '@/shared/lib/utils'

export function SpaceCard({
  space,
  adSpace,
  onSpaceClick,
  onFavoriteClick,
  onAdClick,
  className,
  showFavoriteButton = true,
}: SpaceItemProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const currentSpace = adSpace || space
  const isAd = !!adSpace

  useEffect(() => {
    if (currentSpace?.isFavorite !== undefined) {
      setIsFavorite(currentSpace.isFavorite)
    }
  }, [currentSpace])

  if (!currentSpace) {
    return null
  }

  const handleCardClick = () => {
    if (isAd && onAdClick) {
      onAdClick(adSpace!)
    }
    onSpaceClick?.(currentSpace)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(prev => !prev)
    onFavoriteClick?.(currentSpace)
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
        isAd && 'hover:shadow-lg transform hover:scale-[1.02]',
        isAd && getCardBorderColor(),
        className
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative">
            <figure className="w-[105px] h-full relative overflow-hidden">
              <Image
                src={currentSpace.image || '/placeholder.svg'}
                alt={currentSpace.title}
                fill
                sizes="105px"
                className="object-cover"
                priority={isAd}
              />
            </figure>

            {isAd ? (
              <Badge
                className={cn(
                  'absolute top-1 left-1 text-xs text-white font-bold',
                  getAdBadgeColor()
                )}
              >
                {getAdIcon()}
                {adSpace!.adBadge || 'AD'}
              </Badge>
            ) : currentSpace.isHot ? (
              <Badge className="absolute top-1 left-1 text-xs bg-red-500 hover:bg-red-600">
                HOT
              </Badge>
            ) : currentSpace.isNew ? (
              <Badge className="absolute top-1 left-1 text-xs bg-green-500 hover:bg-green-600">
                NEW
              </Badge>
            ) : null}
          </div>

          <div className="flex-1 p-3">
            <div className="flex items-start justify-between mb-1">
              <h3
                className={cn(
                  'text-sm text-gray-900 dark:text-white line-clamp-1',
                  isAd ? 'font-semibold' : 'font-medium'
                )}
              >
                {currentSpace.title}
              </h3>
              {showFavoriteButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-6 w-6 -mt-1',
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
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
                {adSpace!.promotionText}
              </p>
            )}

            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
              <MapPin className="h-3 w-3 mr-1" />
              {currentSpace.location}
              <div className="flex items-center ml-2">
                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                {currentSpace.rating}
              </div>
            </div>

            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
              {currentSpace.floor && (
                <div className="flex items-center mr-2">
                  <Layers className="h-3 w-3 mr-1" />
                  {currentSpace.floor}
                </div>
              )}
              {currentSpace.area && (
                <div className="flex items-center">
                  <Maximize2 className="h-3 w-3 mr-1" />
                  {currentSpace.area}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between max-[450px]:flex-col max-[450px]:items-start max-[450px]:gap-2">
              <div className="flex gap-2 items-end">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    isAd
                      ? 'text-purple-600 dark:text-purple-400 font-bold'
                      : 'text-blue-600 dark:text-blue-400'
                  )}
                >
                  {currentSpace.price}
                </span>
                {isAd && adSpace!.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {adSpace!.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex space-x-1 max-[450px]:w-full max-[450px]:justify-start">
                {currentSpace.tags?.slice(0, 2).map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      'text-xs px-1 py-0',
                      isAd
                        ? 'border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300'
                        : 'dark:border-gray-600 dark:text-gray-300'
                    )}
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

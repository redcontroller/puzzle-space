'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Heart, Zap, Crown, Sparkles, Layers, Maximize2 } from 'lucide-react';
import type { SpaceItemProps } from '@/shared/types/space-card';
import { cn } from '@/lib/utils';

export default function SpaceItem({ space, adSpace, onSpaceClick, onFavoriteClick, onAdClick, className, showFavoriteButton = true }: SpaceItemProps) {
  // 찜하기 버튼 상태 관리를 위한 로컬 상태 추가
  const [isFavorite, setIsFavorite] = useState(false);

  // adSpace가 있으면 adSpace 사용, 없으면 space 사용
  const currentSpace = adSpace || space;
  const isAd = !!adSpace;

  // 컴포넌트 마운트 시 초기 찜하기 상태 설정
  useEffect(() => {
    if (currentSpace?.isFavorite !== undefined) {
      setIsFavorite(currentSpace.isFavorite);
    }
  }, [currentSpace]);

  if (!currentSpace) {
    return null;
  }

  const handleCardClick = () => {
    if (isAd && onAdClick) {
      onAdClick(adSpace!);
    }
    onSpaceClick?.(currentSpace);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 찜하기 상태 토글
    setIsFavorite((prev) => !prev);
    // 기존 콜백 함수도 호출
    onFavoriteClick?.(currentSpace);
  };

  // 광고 관련 함수들
  const getAdIcon = () => {
    if (!isAd) return null;
    switch (adSpace!.adType) {
      case 'premium':
        return <Crown className="h-2 w-2 mr-1" />;
      case 'featured':
        return <Sparkles className="h-2 w-2 mr-1" />;
      default:
        return <Zap className="h-2 w-2 mr-1" />;
    }
  };

  const getAdBadgeColor = () => {
    if (!isAd) return '';
    switch (adSpace!.adType) {
      case 'premium':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600';
      case 'featured':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600';
      default:
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600';
    }
  };

  const getCardBorderColor = () => {
    if (!isAd) return '';
    switch (adSpace!.adType) {
      case 'premium':
        return 'ring-2 ring-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20';
      case 'featured':
        return 'ring-2 ring-blue-400 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20';
      default:
        return 'ring-2 ring-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20';
    }
  };

  return (
    <Card className={cn('overflow-hidden hover:shadow-md transition-all cursor-pointer', isAd && 'hover:shadow-lg transform hover:scale-[1.02]', isAd && getCardBorderColor(), className)} onClick={handleCardClick}>
      <CardContent className="p-0">
        <div className="flex">
          {/* 이미지 영역 */}
          <div className="relative">
            <figure className="w-[105px] h-full relative overflow-hidden">
              <Image src={currentSpace.image || '/placeholder.svg'} alt={currentSpace.title} fill sizes="105px" className="object-cover" priority={isAd} />
            </figure>

            {/* 우선순위에 따른 단일 배지 표시 */}
            {isAd ? (
              <Badge className={cn('absolute top-1 left-1 text-xs text-white font-bold', getAdBadgeColor())}>
                {getAdIcon()}
                {adSpace!.adBadge || 'AD'}
              </Badge>
            ) : currentSpace.isHot ? (
              <Badge className="absolute top-1 left-1 text-xs bg-red-500 hover:bg-red-600">HOT</Badge>
            ) : currentSpace.isNew ? (
              <Badge className="absolute top-1 left-1 text-xs bg-green-500 hover:bg-green-600">NEW</Badge>
            ) : null}
          </div>

          {/* 콘텐츠 영역 */}
          <div className="flex-1 p-3">
            {/* 제목과 찜하기 버튼 */}
            <div className="flex items-start justify-between mb-1">
              <h3 className={cn('text-sm text-gray-900 dark:text-white line-clamp-1', isAd ? 'font-semibold' : 'font-medium')}>{currentSpace.title}</h3>
              {showFavoriteButton && (
                <Button variant="ghost" size="icon" className={cn('h-6 w-6 -mt-1', isFavorite ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'hover:bg-red-50 dark:hover:bg-red-900/20')} onClick={handleFavoriteClick} aria-label={isFavorite ? '찜 해제하기' : '찜하기'}>
                  <Heart className={cn('h-3 w-3 transition-colors', isFavorite ? 'fill-current text-red-500' : 'hover:text-red-500')} />
                </Button>
              )}
            </div>

            {/* 프로모션 텍스트 (광고만) */}
            {isAd && adSpace!.promotionText && <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">{adSpace!.promotionText}</p>}

            {/* 위치와 평점 */}
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
              <MapPin className="h-3 w-3 mr-1" />
              {currentSpace.location}
              <div className="flex items-center ml-2">
                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                {currentSpace.rating}
              </div>
            </div>

            {/* 층수와 면적 정보 추가 */}
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

            {/* 가격과 태그 - 반응형 레이아웃 */}
            <div className="flex items-center justify-between max-[450px]:flex-col max-[450px]:items-start max-[450px]:gap-2">
              <div className="flex gap-2 items-end">
                <span className={cn('text-sm font-semibold', isAd ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-blue-600 dark:text-blue-400')}>{currentSpace.price}</span>
                {isAd && adSpace!.originalPrice && <span className="text-xs text-gray-400 line-through">{adSpace!.originalPrice}</span>}
              </div>
              <div className="flex space-x-1 max-[450px]:w-full max-[450px]:justify-start">
                {currentSpace.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className={cn('text-xs px-1 py-0', isAd ? 'border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300' : 'dark:border-gray-600 dark:text-gray-300')}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import type React from 'react';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Heart, Layers, Maximize2 } from 'lucide-react';
import type { RecentSpaceCardProps } from '@/shared/types/space-card';
import { cn } from '@/lib/utils';

export default function RecentSpaceCard({ space, onClick, className }: RecentSpaceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // 컴포넌트 마운트 시 초기 찜하기 상태 설정
  useEffect(() => {
    if (space?.isFavorite !== undefined) {
      setIsFavorite(space.isFavorite);
    }
  }, [space]);

  const handleClick = () => {
    onClick?.(space);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <Card key={space.id} className={cn('flex-shrink-0 w-40 hover:shadow-md transition-shadow cursor-pointer', className)} onClick={handleClick}>
      <CardContent className="p-2">
        <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden rounded">
          <figure className="w-full h-full relative">
            <Image src={space.image || '/placeholder.svg'} alt={space.name} fill sizes="(max-width: 768px) 100vw, 160px" className="object-cover" />
          </figure>

          {/* 찜하기 버튼 추가 */}
          <Button variant="ghost" size="icon" className={cn('absolute top-1 right-1 h-6 w-6 bg-white/70 dark:bg-gray-800/70 rounded-full', isFavorite ? 'text-red-500' : 'text-gray-500')} onClick={handleFavoriteClick} aria-label={isFavorite ? '찜 해제하기' : '찜하기'}>
            <Heart className={cn('h-3 w-3 transition-colors', isFavorite ? 'fill-current text-red-500' : '')} />
          </Button>
        </div>

        <h4 className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">{space.name}</h4>

        {/* 층수와 면적 정보 추가 */}
        {(space.floor || space.area) && (
          <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400 mb-1">
            {space.floor && (
              <div className="flex items-center mr-2">
                <Layers className="h-2 w-2 mr-0.5" />
                <span className="truncate">{space.floor}</span>
              </div>
            )}
            {space.area && (
              <div className="flex items-center overflow-hidden">
                <Maximize2 className="h-2 w-2 mr-0.5 flex-shrink-0" />
                <span className="truncate">{space.area}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          {space.viewedAt}
        </div>
      </CardContent>
    </Card>
  );
}

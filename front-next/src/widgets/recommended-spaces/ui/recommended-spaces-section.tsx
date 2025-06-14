'use client'

import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { ArrowRight } from 'lucide-react'
import { SpaceCard } from '@/entities/space/ui/space-card'
import type { Space, AdSpace } from '@/shared/types/space'
import type { JSX } from 'react'

interface RecommendedSpacesSectionProps {
  isSearchActive: boolean
  filteredSpaces: Space[]
  filteredAdSpaces: AdSpace[]
  recommendedSpaces: Space[]
  adSpaces: AdSpace[]
  totalSearchResults: number
  onSpaceClick: (space: Space | AdSpace) => void
  onFavoriteClick: (space: Space | AdSpace) => void
  onAdClick: (adSpace: AdSpace) => void
  EmptyState: ({ message }: { message: string }) => JSX.Element
}

export function RecommendedSpacesSection({
  isSearchActive,
  filteredSpaces,
  filteredAdSpaces,
  recommendedSpaces,
  adSpaces,
  totalSearchResults,
  onSpaceClick,
  onFavoriteClick,
  onAdClick,
  EmptyState,
}: RecommendedSpacesSectionProps) {
  return (
    <section style={{ padding: '8px var(--sizes-layout-padding)' }}>
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {isSearchActive ? '검색 결과' : '추천 공간'}
            </CardTitle>
            {!isSearchActive && (
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 dark:text-blue-400"
              >
                더보기
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
          <CardDescription>
            {isSearchActive
              ? '검색 조건에 맞는 공간들입니다'
              : '당신에게 맞는 완벽한 공간을 찾아보세요'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSearchActive ? (
            // 검색 결과 표시 (광고 + 일반 공간)
            totalSearchResults > 0 ? (
              <div className="space-y-3">
                {/* 광고 공간 먼저 표시 */}
                {filteredAdSpaces.map(adSpace => (
                  <SpaceCard
                    key={`ad-${adSpace.id}`}
                    adSpace={adSpace}
                    onSpaceClick={onSpaceClick}
                    onFavoriteClick={onFavoriteClick}
                    onAdClick={onAdClick}
                  />
                ))}
                {/* 일반 공간 표시 */}
                {filteredSpaces.map(space => (
                  <SpaceCard
                    key={space.id}
                    space={space}
                    onSpaceClick={onSpaceClick}
                    onFavoriteClick={onFavoriteClick}
                  />
                ))}
              </div>
            ) : (
              <EmptyState message="검색 결과가 없습니다. 다른 키워드로 검색해보세요." />
            )
          ) : // 기본 추천 공간 표시
          recommendedSpaces.length > 0 ? (
            <div className="space-y-3">
              {/* 프리미엄 광고 2개 먼저 표시 */}
              {adSpaces
                .filter(ad => ad.adType === 'premium')
                .slice(0, 2)
                .map(adSpace => (
                  <SpaceCard
                    key={`ad-${adSpace.id}`}
                    adSpace={adSpace}
                    onSpaceClick={onSpaceClick}
                    onFavoriteClick={onFavoriteClick}
                    onAdClick={onAdClick}
                  />
                ))}

              {/* 추천 공간 3개 표시 */}
              {recommendedSpaces.slice(0, 3).map(space => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onSpaceClick={onSpaceClick}
                  onFavoriteClick={onFavoriteClick}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="추천 공간을 불러올 수 없습니다." />
          )}
        </CardContent>
        {isSearchActive && totalSearchResults > 6 && (
          <CardFooter>
            <Button variant="outline" className="w-full">
              더 많은 결과 보기 ({totalSearchResults - 6}개 더)
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  )
}

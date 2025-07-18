'use client'

import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { RecentSpaceCard } from '@/entities/space/ui/recent-space-card'
import type { RecentSpace } from '@/shared/types/space'
import type { JSX } from 'react'

interface RecentSpacesSectionProps {
  recentSpaces: RecentSpace[]
  onRecentSpaceClick: (space: RecentSpace) => void
  EmptyState: ({ message }: { message: string }) => JSX.Element
}

export function RecentSpacesSection({
  recentSpaces,
  onRecentSpaceClick,
  EmptyState,
}: RecentSpacesSectionProps) {
  return (
    <section style={{ padding: '8px var(--sizes-layout-padding)' }}>
      <Card className="py-4">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">최근 본 공간</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 dark:text-blue-400"
            >
              전체보기
            </Button>
          </div>
          <CardDescription>
            최근에 확인한 공간들을 다시 살펴보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentSpaces.length > 0 ? (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {recentSpaces.map(space => (
                <RecentSpaceCard
                  key={space.id}
                  space={space}
                  onClick={onRecentSpaceClick}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="최근 본 공간이 없습니다." />
          )}
        </CardContent>
      </Card>
    </section>
  )
}

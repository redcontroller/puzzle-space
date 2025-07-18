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
import { TrendingUp, Calendar } from 'lucide-react'
import { PopularSpaceCard } from '@/entities/space/ui/popular-space-card'
import type { PopularSpace } from '@/shared/types/space'
import type { JSX } from 'react'

interface PopularSpacesSectionProps {
  popularSpaces: PopularSpace[]
  onPopularSpaceClick: (space: PopularSpace) => void
  EmptyState: ({ message }: { message: string }) => JSX.Element
}

export function PopularSpacesSection({
  popularSpaces,
  onPopularSpaceClick,
  EmptyState,
}: PopularSpacesSectionProps) {
  return (
    <section style={{ padding: '8px var(--sizes-layout-padding)' }}>
      <Card className="pd-4">
        <CardHeader className="py-4">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
            이번 주 인기 공간
          </CardTitle>
          <CardDescription>가장 많은 관심을 받고 있는 공간들</CardDescription>
        </CardHeader>
        <CardContent>
          {popularSpaces.length > 0 ? (
            <div className="space-y-3">
              {popularSpaces.map(space => (
                <PopularSpaceCard
                  key={space.rank}
                  space={space}
                  onClick={onPopularSpaceClick}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="인기 공간 데이터를 불러올 수 없습니다." />
          )}
        </CardContent>
        <CardFooter className="pb-4">
          <Button variant="outline" className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            전체 랭킹 보기
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

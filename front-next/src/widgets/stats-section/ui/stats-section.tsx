'use client'

import { Card, CardContent } from '@/shared/ui/card'
import { TrendingUp, Users } from 'lucide-react'
import type { Stats } from '@/shared/types/space'

interface StatsSectionProps {
  stats: Stats
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section style={{ padding: '8px var(--sizes-layout-padding)' }}>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs font-medium">등록 공간</p>
                <p className="text-2xl font-bold">{stats.registeredSpaces}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs font-medium">성공 매칭</p>
                <p className="text-2xl font-bold">{stats.successfulMatches}</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

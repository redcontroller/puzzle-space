'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import {
  ArrowRight,
  Building2,
  FileText,
  MessageSquarePlus,
  Heart,
} from 'lucide-react'
import type { ActivityStats } from '@/shared/types/profile'

interface ActivityStatsProps {
  stats: ActivityStats
  onViewRegisteredSpaces: () => void
  onViewAppliedSpaces: () => void
  onViewRequestedSpaces: () => void
  onViewFavoriteSpaces: () => void
}

export function ActivityStatsSection({
  stats,
  onViewRegisteredSpaces,
  onViewAppliedSpaces,
  onViewRequestedSpaces,
  onViewFavoriteSpaces,
}: ActivityStatsProps) {
  const activityItems = [
    {
      title: '나의 등록공간',
      count: stats.registeredSpaces,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      onClick: onViewRegisteredSpaces,
    },
    {
      title: '신청공간',
      count: stats.appliedSpaces,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      onClick: onViewAppliedSpaces,
    },
    {
      title: '요청공간',
      count: stats.requestedSpaces,
      icon: MessageSquarePlus,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      onClick: onViewRequestedSpaces,
    },
    {
      title: '찜공간',
      count: stats.favoriteSpaces,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      onClick: onViewFavoriteSpaces,
    },
  ]

  return (
    <div style={{ padding: '0 var(--sizes-layout-padding)' }}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">활동 정보</CardTitle>
          <CardDescription>나의 공간 활동 현황을 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {activityItems.map(item => (
              <button
                key={item.title}
                onClick={item.onClick}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.count}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

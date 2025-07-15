'use client'

import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'
import {
  Clock,
  MessageSquare,
  Eye,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react'
import type { SpaceRequest } from '@/shared/types/space-request'
import { cn } from '@/shared/lib/utils'

interface SpaceRequestCardProps {
  request: SpaceRequest
  onClick?: (request: SpaceRequest) => void
  className?: string
  compact?: boolean
}

export function SpaceRequestCard({
  request,
  onClick,
  className,
  compact = false,
}: SpaceRequestCardProps) {
  const handleClick = () => {
    if (onClick) onClick(request)
  }

  const getSpaceTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      office: '사무실',
      warehouse: '창고',
      retail: '상가',
      studio: '스튜디오',
      parking: '주차장',
      workshop: '공방',
    }
    return types[type] || type
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            <Clock className="h-3 w-3 mr-1" />
            대기중
          </Badge>
        )
      case 'processing':
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            <TrendingUp className="h-3 w-3 mr-1" />
            처리중
          </Badge>
        )
      case 'matched':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            매칭완료
          </Badge>
        )
      case 'completed':
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            완료
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            <AlertTriangle className="h-3 w-3 mr-1" />
            취소됨
          </Badge>
        )
      default:
        return null
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return (
          <Badge variant="destructive" className="text-xs">
            급함
          </Badge>
        )
      case 'medium':
        return (
          <Badge variant="secondary" className="text-xs">
            보통
          </Badge>
        )
      case 'low':
        return (
          <Badge variant="outline" className="text-xs">
            여유
          </Badge>
        )
      default:
        return null
    }
  }

  const formatBudget = (min: number, max: number, period: string) => {
    const periodLabel =
      period === 'daily' ? '일' : period === 'monthly' ? '월' : '년'
    return `${min.toLocaleString()}~${max.toLocaleString()}원/${periodLabel}`
  }

  const formatArea = (area?: { min: number; max: number; unit: string }) => {
    if (!area) return null

    const { min, max, unit } = area
    let formattedArea = ''

    if (min === max) {
      formattedArea = `${min}${unit}`
    } else {
      formattedArea = `${min}~${max}${unit}`
    }

    // 평을 m²로 변환하여 표시
    if (unit === '평') {
      const minM2 = Math.round(min * 3.3058)
      const maxM2 = Math.round(max * 3.3058)

      if (min === max) {
        formattedArea += ` (${minM2}m²)`
      } else {
        formattedArea += ` (${minM2}~${maxM2}m²)`
      }
    }

    return formattedArea
  }

  return (
    <Card
      className={cn(
        'overflow-hidden hover:shadow-md transition-all cursor-pointer',
        request.isMyRequest && 'border-blue-200 dark:border-blue-800',
        className
      )}
      onClick={handleClick}
    >
      <CardContent className={cn('p-4', compact && 'p-3')}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {request.isMyRequest && (
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                내 요청
              </Badge>
            )}
            {getStatusBadge(request.status)}
            {getUrgencyBadge(request.urgency)}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {request.views}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {request.proposals}
            </span>
          </div>
        </div>

        <h3
          className={cn(
            'font-medium text-gray-900 dark:text-white mb-2',
            compact ? 'text-sm' : 'text-base'
          )}
        >
          {request.title}
        </h3>

        {!compact && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {request.content}
          </p>
        )}

        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              📍 {request.location.region} {request.location.district}
            </span>
            <span>🏢 {getSpaceTypeLabel(request.spaceType)}</span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              💰{' '}
              {formatBudget(
                request.budget.min,
                request.budget.max,
                request.budget.period
              )}
            </span>
            {request.requirements.area && (
              <span>📏 {formatArea(request.requirements.area)}</span>
            )}
          </div>

          {!compact &&
            request.requirements.facilities &&
            request.requirements.facilities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {request.requirements.facilities.slice(0, 3).map(facility => (
                  <Badge
                    key={facility}
                    variant="outline"
                    className="text-xs px-1.5 py-0"
                  >
                    {facility}
                  </Badge>
                ))}
                {request.requirements.facilities.length > 3 && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    +{request.requirements.facilities.length - 3}
                  </Badge>
                )}
              </div>
            )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {request.author.profileImage && (
              <img
                src={request.author.profileImage || '/placeholder.svg'}
                alt={request.author.name}
                className="w-5 h-5 rounded-full"
              />
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {request.author.name}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {request.createdAt}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

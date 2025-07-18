'use client'

import type React from 'react'

import { Card, CardContent } from '@/shared/ui/card'
import { ArrowRight } from 'lucide-react'
import type { ManualCardProps } from '@/shared/types/manual'
import { cn } from '@/shared/lib/utils'

export function ManualCard({ manual, onClick, className }: ManualCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick?.(manual)
  }

  return (
    <Card
      className={cn(
        'flex-shrink-0 w-72 h-32 py-0 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] overflow-hidden select-none',
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-0 h-full">
        <div
          className={cn(
            'h-full bg-gradient-to-br',
            manual.color,
            'text-white relative'
          )}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 text-4xl">{manual.icon}</div>
            <div className="absolute bottom-2 left-2 w-16 h-16 rounded-full bg-white/20"></div>
            <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-full bg-white/10"></div>
          </div>

          <div className="relative h-full p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold leading-tight mb-2 line-clamp-2">
                {manual.title}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium opacity-90">
                {manual.linkText}
              </span>
              <ArrowRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

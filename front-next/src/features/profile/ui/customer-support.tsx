'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { ArrowRight, HelpCircle } from 'lucide-react'
import type { CustomerSupportItem } from '@/shared/types/profile'

interface CustomerSupportProps {
  items: CustomerSupportItem[]
  onItemClick: (item: CustomerSupportItem) => void
}

export function CustomerSupportSection({
  items,
  onItemClick,
}: CustomerSupportProps) {
  return (
    <div style={{ padding: '0 var(--sizes-layout-padding)' }}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            고객지원
          </CardTitle>
          <CardDescription>
            도움이 필요하시면 언제든 문의해주세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => onItemClick(item)}
                className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

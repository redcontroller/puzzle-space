'use client'

import { Badge } from '@/shared/ui/badge'
import { mapCategories } from '@/shared/mock-data/map-categories'

interface MapCategoryFilterProps {
  selectedCategory: string | null
  onCategoryChange: (categoryId: string) => void
}

export function MapCategoryFilter({
  selectedCategory,
  onCategoryChange,
}: MapCategoryFilterProps) {
  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(selectedCategory === categoryId ? '' : categoryId)
  }

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {mapCategories.map(category => {
        const IconComponent = category.icon as any

        return (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className={`cursor-pointer whitespace-nowrap shadow-md flex items-center ${
              selectedCategory === category.id
                ? 'bg-blue-600/90 hover:bg-blue-700/90 backdrop-blur-sm'
                : 'bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-800/90 backdrop-blur-sm border-white/30 dark:border-gray-700/30'
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <IconComponent className="h-3 w-3 mr-1" />
            {category.label}
          </Badge>
        )
      })}
    </div>
  )
}

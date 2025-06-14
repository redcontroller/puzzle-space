'use client'

import { Heart } from 'lucide-react'
import { getMarkerColor } from '@/shared/lib/map-utils'
import type { MapMarker } from '@/shared/types/map'

interface MapMarkerProps {
  marker: MapMarker
  isSelected: boolean
  isFavorite: boolean
  onClick: (markerId: number) => void
}

export function MapMarkerComponent({
  marker,
  isSelected,
  isFavorite,
  onClick,
}: MapMarkerProps) {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${isSelected ? 'scale-125 drop-shadow-xl z-10' : isFavorite ? 'drop-shadow-lg' : 'drop-shadow-md'}`}
      style={{
        top: marker.position.top,
        left: marker.position.left,
      }}
      onClick={() => onClick(marker.id)}
    >
      {/* 퍼즐 조각 SVG */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className={`${getMarkerColor(marker.type)} ${isSelected ? 'animate-pulse' : ''}`}
      >
        <path
          d="M8 4 C6 4 4 6 4 8 L4 12 C4 12 6 10 8 12 C10 14 10 16 8 18 C6 20 4 18 4 18 L4 24 C4 26 6 28 8 28 L14 28 C14 28 12 26 14 24 C16 22 18 22 20 24 C22 26 20 28 20 28 L24 28 C26 28 28 26 28 24 L28 18 C28 18 26 20 24 18 C22 16 22 14 24 12 C26 10 28 12 28 12 L28 8 C28 6 26 4 24 4 L20 4 C20 4 22 6 20 8 C18 10 16 10 14 8 C12 6 14 4 14 4 L8 4 Z"
          fill="currentColor"
          stroke={isSelected ? 'white' : 'white'}
          strokeWidth={isSelected ? '2' : '1.5'}
        />
        <text
          x="16"
          y="20"
          textAnchor="middle"
          className="text-xs font-bold fill-white"
        >
          {marker.id}
        </text>
      </svg>

      {/* 찜한 공간 하트 표시 */}
      {isFavorite && (
        <Heart className="absolute -top-1 -right-1 h-4 w-4 text-red-500 fill-current bg-white rounded-full p-0.5 border border-red-200" />
      )}

      {/* 선택된 마커 표시 */}
      {isSelected && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded-md text-xs font-medium shadow-md whitespace-nowrap">
          {marker.title}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-white dark:bg-gray-800"></div>
        </div>
      )}
    </div>
  )
}

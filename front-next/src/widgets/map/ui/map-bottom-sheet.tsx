'use client'

import { useRef } from 'react'
import { MapPin, Heart, XCircle, Search } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { SpaceCard } from '@/entities/space/ui/space-card'
import { getCategoryById } from '@/shared/mock-data/map-categories'
import type { MapMarker } from '@/shared/types/map'

interface MapBottomSheetProps {
  bottomSheetHeight: number
  isDragging: boolean
  showList: boolean
  selectedMarkerId: number | null
  showFavoritesOnly: boolean
  selectedCategory: string | null
  currentLocation: string
  displaySpaces: MapMarker[]
  favoriteCount: number
  onToggleFavoritesFilter: () => void
  onClearSelection: () => void
  onSpaceClick: (space: any) => void
  onFavoriteClick: (space: any) => void
}

export function MapBottomSheet({
  bottomSheetHeight,
  isDragging,
  showList,
  selectedMarkerId,
  showFavoritesOnly,
  selectedCategory,
  currentLocation,
  displaySpaces,
  favoriteCount,
  onToggleFavoritesFilter,
  onClearSelection,
  onSpaceClick,
  onFavoriteClick,
}: MapBottomSheetProps) {
  const dragHandleRef = useRef<HTMLDivElement>(null)

  const getCategoryIcon = (type: string) => {
    const category = getCategoryById(type)
    if (!category) return null

    const IconComponent = category.icon as any
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <div
      data-bottom-sheet="true"
      tabIndex={0}
      role="region"
      aria-label="지도 하단 공간 목록"
      aria-expanded={showList}
      className={`absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 rounded-t-xl shadow-2xl z-[30] ${
        isDragging ? 'select-none' : ''
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      style={{
        height: `${bottomSheetHeight}px`,
        transition: isDragging ? 'none' : 'height 0.3s ease',
      }}
    >
      {/* 하트 버튼 - 바텀 시트 내부에서 absolute 위치 */}
      <div className="absolute -top-14 left-4 z-10">
        <Button
          variant={showFavoritesOnly ? 'default' : 'secondary'}
          size="icon"
          className={`relative shadow-lg backdrop-blur-sm ${
            showFavoritesOnly
              ? 'bg-red-500/90 hover:bg-red-600/90 border-red-400/20 text-white'
              : 'bg-white/90 dark:bg-gray-800/90 hover:bg-white/95 dark:hover:bg-gray-800/95 border-white/20 dark:border-gray-700/20'
          }`}
          onClick={onToggleFavoritesFilter}
        >
          <Heart
            className={`h-4 w-4 transition-all ${
              showFavoritesOnly
                ? 'fill-current text-white'
                : 'text-red-500 hover:fill-current'
            }`}
          />
          {favoriteCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {favoriteCount}
            </span>
          )}
        </Button>

        {/* 하트 버튼 툴팁 */}
        <div
          className={`absolute left-12 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-opacity ${
            showFavoritesOnly ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          찜한 공간만 보기
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-2 border-b-2 border-r-4 border-transparent border-r-gray-800"></div>
        </div>
      </div>

      {/* 드래그 핸들 */}
      <div
        data-drag-handle="true"
        role="slider"
        aria-label="바텀 시트 높이 조절"
        aria-valuemin={130}
        aria-valuemax={600}
        aria-valuenow={bottomSheetHeight}
        tabIndex={0}
        className={`flex items-center justify-center py-3 cursor-grab select-none ${
          isDragging
            ? 'cursor-grabbing bg-gray-100 dark:bg-gray-700'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
        } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset`}
      >
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors"></div>
        <span className="sr-only">
          바텀 시트 높이: {bottomSheetHeight}px. 드래그하여 높이를 조절하세요.
        </span>
      </div>

      {/* 드래그 중 시각적 피드백 개선 */}

      {/* 최소화된 상태에서 보이는 정보 */}
      {!showList && (
        <div
          className={`px-4 flex items-center justify-between ${
            isDragging ? 'opacity-75' : ''
          } transition-opacity`}
        >
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentLocation}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {selectedMarkerId !== null && (
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs">
                선택된 공간
              </Badge>
            )}
            {showFavoritesOnly && (
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs">
                <Heart className="h-3 w-3 mr-1 fill-current" />
                찜한 공간
              </Badge>
            )}
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              공간 {displaySpaces.length}개
            </Badge>
          </div>
        </div>
      )}

      {/* 확장된 상태에서 보이는 정보 */}
      {showList && (
        <>
          <div
            className={`px-4 pb-2 ${
              isDragging ? 'opacity-75' : ''
            } transition-opacity`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {selectedMarkerId !== null && (
                  <>
                    {getCategoryIcon(
                      displaySpaces.find(s => s.id === selectedMarkerId)
                        ?.type || ''
                    )}
                    <span>선택된 공간</span>
                  </>
                )}
                {!selectedMarkerId && showFavoritesOnly && (
                  <>
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                    <span>찜한 공간</span>
                  </>
                )}
                {!selectedMarkerId && !showFavoritesOnly && (
                  <>
                    {selectedCategory && getCategoryIcon(selectedCategory)}
                    <span>
                      {selectedCategory
                        ? getCategoryById(selectedCategory)?.label
                        : '주변 공유 공간'}
                    </span>
                  </>
                )}{' '}
                {displaySpaces.length}개
              </h3>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLocation}
                </span>

                {/* 선택 해제 버튼 */}
                {selectedMarkerId !== null && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={onClearSelection}
                  >
                    <XCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedMarkerId !== null
                ? '선택한 공유 공간 정보'
                : showFavoritesOnly
                ? '찜한 공간 목록'
                : selectedCategory
                ? `${getCategoryById(selectedCategory)?.label} 공간`
                : '현재 위치에서 가까운 공간'}
            </p>
          </div>

          <div
            className={`overflow-y-auto px-4 pb-4 ${
              isDragging ? 'pointer-events-none opacity-75' : ''
            } transition-opacity`}
            style={{ height: `${bottomSheetHeight - 80}px` }}
          >
            <div className="space-y-3">
              {displaySpaces.map(space => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onSpaceClick={onSpaceClick}
                  onFavoriteClick={onFavoriteClick}
                />
              ))}

              {displaySpaces.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                    검색 결과가 없습니다
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    다른 검색어나 필터를 사용해보세요
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

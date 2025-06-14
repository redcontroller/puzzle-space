'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Locate, Layers, Filter } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { LeafletMap } from '@/features/map/ui/leaflet-map'
import { MapCategoryFilter } from '@/features/map/ui/map-category-filter'
import { MapBottomSheet } from '@/widgets/map/ui/map-bottom-sheet'
import { mapMarkers } from '@/shared/mock-data/map-markers'
import { filterMarkers } from '@/shared/lib/map-utils'
import type { MapViewState } from '@/shared/types/map'

export default function MapPage() {
  // 상태 관리
  const [viewState, setViewState] = useState<MapViewState>({
    searchQuery: '',
    selectedCategory: null,
    isMapLoaded: false,
    showList: false,
    currentLocation: '서울특별시 강남구',
    isDragging: false,
    bottomSheetHeight: 130,
    showFavoritesOnly: false,
    favoriteSpaces: new Set([1, 3, 5]),
    selectedMarkerId: null,
    mapCenter: { lat: 37.5172, lng: 127.0473 }, // 강남역 중심
    mapZoom: 14,
  })

  // Refs
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // 드래그 관련 상태
  const [dragStartHeight, setDragStartHeight] = useState(0)
  const [dragStartY, setDragStartY] = useState(0)

  // 지도 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setViewState(prev => ({ ...prev, isMapLoaded: true }))
    }, 2000) // Leaflet 로딩 시간을 고려하여 증가

    return () => clearTimeout(timer)
  }, [])

  // 바텀 시트 높이 계산 함수
  const calculateNewHeight = (
    currentY: number,
    startY: number,
    startHeight: number
  ): number => {
    const windowHeight = window.innerHeight
    const navHeight = 64
    const minHeight = 130
    const maxHeight = windowHeight * 0.8

    // 드래그 거리 계산 (위로 드래그하면 음수, 아래로 드래그하면 양수)
    const dragDistance = currentY - startY

    // 새로운 높이 = 시작 높이 - 드래그 거리 (위로 드래그하면 높이 증가)
    const newHeight = startHeight - dragDistance

    // 최소/최대 범위 내에서 제한
    return Math.max(minHeight, Math.min(newHeight, maxHeight))
  }

  // 스냅 포인트로 조정하는 함수 (선택적으로 사용)
  const snapToNearestPoint = (currentHeight: number): number => {
    const windowHeight = window.innerHeight
    const maxHeight = windowHeight * 0.8
    const snapPoints = [130, 300, 400, maxHeight]
    const snapThreshold = 30 // 30px 범위 내에서만 스냅

    // 가장 가까운 스냅 포인트 찾기
    let closestPoint = snapPoints[0]
    let minDistance = Math.abs(currentHeight - closestPoint)

    for (const point of snapPoints) {
      const distance = Math.abs(currentHeight - point)
      if (distance < minDistance) {
        minDistance = distance
        closestPoint = point
      }
    }

    // 스냅 임계값 내에 있을 때만 스냅 적용
    return minDistance <= snapThreshold ? closestPoint : currentHeight
  }

  // 마우스 이벤트 처리
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-drag-handle]')) {
        e.preventDefault()
        setDragStartY(e.clientY)
        setDragStartHeight(viewState.bottomSheetHeight)
        setViewState(prev => ({ ...prev, isDragging: true }))
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!viewState.isDragging) return

      e.preventDefault()
      const newHeight = calculateNewHeight(
        e.clientY,
        dragStartY,
        dragStartHeight
      )

      setViewState(prev => ({
        ...prev,
        bottomSheetHeight: newHeight,
        showList: newHeight > 150,
      }))
    }

    const handleMouseUp = () => {
      if (viewState.isDragging) {
        // 드래그 완료 시 현재 높이를 유지하되, 스냅 포인트 근처에 있으면 스냅 적용
        const finalHeight = snapToNearestPoint(viewState.bottomSheetHeight)

        setViewState(prev => ({
          ...prev,
          isDragging: false,
          bottomSheetHeight: finalHeight,
          showList: finalHeight > 150,
        }))

        // 드래그 상태 리셋
        setDragStartY(0)
        setDragStartHeight(0)
      }
    }

    // 전역 이벤트 리스너 등록
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    viewState.isDragging,
    dragStartY,
    dragStartHeight,
    viewState.bottomSheetHeight,
  ])

  // 터치 이벤트 처리
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-drag-handle]')) {
        const touch = e.touches[0]
        setDragStartY(touch.clientY)
        setDragStartHeight(viewState.bottomSheetHeight)
        setViewState(prev => ({ ...prev, isDragging: true }))
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!viewState.isDragging) return

      e.preventDefault()
      const touch = e.touches[0]
      const newHeight = calculateNewHeight(
        touch.clientY,
        dragStartY,
        dragStartHeight
      )

      setViewState(prev => ({
        ...prev,
        bottomSheetHeight: newHeight,
        showList: newHeight > 150,
      }))
    }

    const handleTouchEnd = () => {
      if (viewState.isDragging) {
        // 터치 드래그 완료 시에도 현재 높이를 유지하되, 스냅 포인트 근처에 있으면 스냅 적용
        const finalHeight = snapToNearestPoint(viewState.bottomSheetHeight)

        setViewState(prev => ({
          ...prev,
          isDragging: false,
          bottomSheetHeight: finalHeight,
          showList: finalHeight > 150,
        }))

        // 드래그 상태 리셋
        setDragStartY(0)
        setDragStartHeight(0)
      }
    }

    // 전역 터치 이벤트 리스너 등록
    document.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    viewState.isDragging,
    dragStartY,
    dragStartHeight,
    viewState.bottomSheetHeight,
  ])

  // 키보드 접근성 추가
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 바텀 시트가 포커스된 상태에서만 동작
      if (document.activeElement?.closest('[data-bottom-sheet]')) {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            setViewState(prev => ({
              ...prev,
              bottomSheetHeight: Math.min(
                prev.bottomSheetHeight + 50,
                window.innerHeight * 0.8
              ),
              showList: true,
            }))
            break
          case 'ArrowDown':
            e.preventDefault()
            setViewState(prev => ({
              ...prev,
              bottomSheetHeight: Math.max(prev.bottomSheetHeight - 50, 80),
              showList: prev.bottomSheetHeight - 50 > 150,
            }))
            break
          case 'Home':
            e.preventDefault()
            setViewState(prev => ({
              ...prev,
              bottomSheetHeight: window.innerHeight * 0.8,
              showList: true,
            }))
            break
          case 'End':
            e.preventDefault()
            setViewState(prev => ({
              ...prev,
              bottomSheetHeight: 80,
              showList: false,
            }))
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 이벤트 핸들러들
  const handleSpaceClick = (space: any) => {
    console.log('Space clicked:', space)
  }

  const handleFavoriteClick = (space: any) => {
    console.log('Favorite clicked:', space)
    setViewState(prev => {
      const newFavorites = new Set(prev.favoriteSpaces)
      if (newFavorites.has(space.id)) {
        newFavorites.delete(space.id)
      } else {
        newFavorites.add(space.id)
      }
      return { ...prev, favoriteSpaces: newFavorites }
    })
  }

  const handleMyLocationClick = () => {
    console.log('Finding user location...')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setViewState(prev => ({
            ...prev,
            mapCenter: { lat: latitude, lng: longitude },
            mapZoom: 16,
          }))
        },
        error => {
          console.error('위치 정보를 가져올 수 없습니다:', error)
          alert('위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인해주세요.')
        }
      )
    } else {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.')
    }
  }

  const handleLayerToggle = () => {
    console.log('Toggling map layers')
  }

  const handleFilterClick = () => {
    console.log('Opening filters')
  }

  const handleCategoryChange = (categoryId: string) => {
    setViewState(prev => ({
      ...prev,
      selectedCategory: categoryId || null,
      selectedMarkerId: null,
    }))
  }

  const handleToggleFavoritesFilter = () => {
    setViewState(prev => ({
      ...prev,
      showFavoritesOnly: !prev.showFavoritesOnly,
      selectedMarkerId: null,
    }))
  }

  const handleMarkerClick = (markerId: number) => {
    console.log(`Marker ${markerId} clicked`)

    setViewState(prev => {
      // 이미 선택된 마커를 다시 클릭하면 선택 해제
      if (prev.selectedMarkerId === markerId) {
        return { ...prev, selectedMarkerId: null }
      }

      // 마커 선택 및 바텀 시트 확장 (현재 높이가 너무 낮으면 적절한 높이로 조정)
      const newHeight =
        prev.bottomSheetHeight < 200 ? 300 : prev.bottomSheetHeight

      return {
        ...prev,
        selectedMarkerId: markerId,
        showList: true,
        bottomSheetHeight: newHeight,
      }
    })
  }

  const handleClearSelection = () => {
    setViewState(prev => ({ ...prev, selectedMarkerId: null }))
  }

  // 표시할 마커 필터링
  const visibleMarkers = filterMarkers(mapMarkers, {
    category: viewState.selectedCategory,
    favoriteIds: viewState.favoriteSpaces,
    showFavoritesOnly: viewState.showFavoritesOnly,
  })

  // 바텀 시트에 표시할 공간 목록
  let displaySpaces = mapMarkers

  if (viewState.selectedMarkerId !== null) {
    displaySpaces = mapMarkers.filter(
      marker => marker.id === viewState.selectedMarkerId
    )
  } else {
    displaySpaces = filterMarkers(mapMarkers, {
      category: viewState.selectedCategory,
      favoriteIds: viewState.favoriteSpaces,
      showFavoritesOnly: viewState.showFavoritesOnly,
    })
  }

  return (
    <main>
      <div
        className="min-h-screen bg-gray-50 dark:bg-gray-900 relative"
        ref={mapContainerRef}
        style={{ paddingBottom: 'var(--sizes-nav-height)' }}
      >
        {/* 지도 영역 (전체 화면) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ bottom: 'var(--sizes-nav-height)' }}
        >
          {!viewState.isMapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 dark:border-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">
                  실제 지도를 불러오는 중...
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  OpenStreetMap 데이터 로딩 중
                </p>
              </div>
            </div>
          ) : (
            <LeafletMap
              center={viewState.mapCenter}
              zoom={viewState.mapZoom}
              markers={visibleMarkers}
              selectedMarkerId={viewState.selectedMarkerId}
              onMarkerClick={handleMarkerClick}
              className="w-full h-full"
            />
          )}
        </div>

        {/* 투명한 검색 헤더 (지도 위에 오버레이) */}
        <div
          className="relative z-10"
          style={{ padding: 'var(--sizes-layout-padding)' }}
        >
          {/* 검색 입력 */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder="지역, 지하철역, 건물명으로 검색"
              value={viewState.searchQuery}
              onChange={e =>
                setViewState(prev => ({ ...prev, searchQuery: e.target.value }))
              }
              className="pl-10 pr-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-white/20 dark:border-gray-700/20 shadow-lg"
            />
          </div>

          {/* 카테고리 필터 */}
          <MapCategoryFilter
            selectedCategory={viewState.selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* 지도 컨트롤 버튼 */}
        <div
          ref={controlsRef}
          className="absolute top-20 right-4 space-y-2 z-20"
        >
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-white/20 dark:border-gray-700/20"
            onClick={handleMyLocationClick}
          >
            <Locate className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-white/20 dark:border-gray-700/20"
            onClick={handleLayerToggle}
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-white/20 dark:border-gray-700/20"
            onClick={handleFilterClick}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* 하단 공간 목록 (바텀 시트) */}
        <MapBottomSheet
          bottomSheetHeight={viewState.bottomSheetHeight}
          isDragging={viewState.isDragging}
          showList={viewState.showList}
          selectedMarkerId={viewState.selectedMarkerId}
          showFavoritesOnly={viewState.showFavoritesOnly}
          selectedCategory={viewState.selectedCategory}
          currentLocation={viewState.currentLocation}
          displaySpaces={displaySpaces}
          favoriteCount={viewState.favoriteSpaces.size}
          onToggleFavoritesFilter={handleToggleFavoritesFilter}
          onClearSelection={handleClearSelection}
          onSpaceClick={handleSpaceClick}
          onFavoriteClick={handleFavoriteClick}
        />
      </div>
    </main>
  )
}

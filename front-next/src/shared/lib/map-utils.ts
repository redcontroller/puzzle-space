import type { MapMarker } from '../types/map'

// 마커 색상 결정 함수
export const getMarkerColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    office: 'text-blue-500',
    warehouse: 'text-gray-500',
    retail: 'text-green-500',
    studio: 'text-purple-500',
    parking: 'text-red-500',
    workshop: 'text-yellow-500',
  }

  return colorMap[type] || 'text-blue-500'
}

// 마커 필터링 함수
export const filterMarkers = (
  markers: MapMarker[],
  options: {
    category?: string | null
    favoriteIds?: Set<number>
    showFavoritesOnly?: boolean
  }
): MapMarker[] => {
  let filtered = [...markers]

  // 카테고리 필터링
  if (options.category) {
    filtered = filtered.filter(marker => marker.type === options.category)
  }

  // 찜하기 필터링
  if (options.showFavoritesOnly && options.favoriteIds) {
    filtered = filtered.filter(marker => options.favoriteIds!.has(marker.id))
  }

  return filtered
}

// 바텀 시트 높이 계산 함수
export const calculateBottomSheetHeight = (
  mouseY: number,
  windowHeight: number,
  controlsBottom: number,
  navHeight = 64,
  minHeight = 80
): number => {
  const maxHeight = windowHeight - controlsBottom
  const newHeight = windowHeight - mouseY - navHeight
  return Math.max(minHeight, Math.min(newHeight, maxHeight))
}

// 지도 마커 위치 유효성 검사
export const isValidMarkerPosition = (position: {
  top: string
  left: string
}): boolean => {
  const topPercent = Number.parseFloat(position.top.replace('%', ''))
  const leftPercent = Number.parseFloat(position.left.replace('%', ''))

  return (
    !isNaN(topPercent) &&
    !isNaN(leftPercent) &&
    topPercent >= 0 &&
    topPercent <= 100 &&
    leftPercent >= 0 &&
    leftPercent <= 100
  )
}

// 마커 검색 함수
export const searchMarkers = (
  markers: MapMarker[],
  query: string
): MapMarker[] => {
  if (!query.trim()) return markers

  const searchTerm = query.toLowerCase().trim()

  return markers.filter(
    marker =>
      marker.title.toLowerCase().includes(searchTerm) ||
      marker.location.toLowerCase().includes(searchTerm) ||
      marker.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

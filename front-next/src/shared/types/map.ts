import type React from 'react'

export interface MapMarker {
  id: number
  position: { lat: number; lng: number } // 실제 좌표로 변경
  type: string
  title: string
  location: string
  price: string
  rating: number
  image: string
  tags: string[]
  isFavorite: boolean
}

export interface MapCategory {
  id: string
  label: string
  icon: React.ReactNode
}

export interface MapPosition {
  lat: number
  lng: number
}

export interface MapViewState {
  searchQuery: string
  selectedCategory: string | null
  isMapLoaded: boolean
  showList: boolean
  currentLocation: string
  isDragging: boolean
  bottomSheetHeight: number
  showFavoritesOnly: boolean
  favoriteSpaces: Set<number>
  selectedMarkerId: number | null
  mapCenter: { lat: number; lng: number }
  mapZoom: number
}

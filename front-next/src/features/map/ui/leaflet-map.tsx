'use client'

import { useEffect, useRef, useState } from 'react'
import type { MapMarker } from '@/shared/types/map'

interface LeafletMapProps {
  center: { lat: number; lng: number }
  zoom: number
  markers: MapMarker[]
  selectedMarkerId: number | null
  onMarkerClick: (markerId: number) => void
  onLocationFound?: (lat: number, lng: number) => void
  className?: string
}

// Leaflet 타입 정의
declare global {
  interface Window {
    L: any
  }
}

export function LeafletMap({
  center,
  zoom,
  markers,
  selectedMarkerId,
  onMarkerClick,
  onLocationFound,
  className = '',
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // 마커 색상 매핑
  const getMarkerColor = (type: string, isSelected: boolean) => {
    if (isSelected) return '#ef4444' // 선택된 마커는 빨간색

    const colorMap: Record<string, string> = {
      office: '#3b82f6', // 파란색
      warehouse: '#6b7280', // 회색
      retail: '#10b981', // 초록색
      studio: '#8b5cf6', // 보라색
      parking: '#ef4444', // 빨간색
      workshop: '#f59e0b', // 노란색
    }
    return colorMap[type] || '#3b82f6'
  }

  // 스크립트 로드 함수
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
      document.head.appendChild(script)
    })
  }

  // CSS 로드 함수
  const loadCSS = (href: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[href="${href}"]`)) {
        resolve()
        return
      }

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.onload = () => resolve()
      link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`))
      document.head.appendChild(link)
    })
  }

  // 현재 위치 찾기
  const findMyLocation = () => {
    if (!mapInstanceRef.current) return

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          const map = mapInstanceRef.current

          // 지도 중심을 현재 위치로 이동
          map.setView([latitude, longitude], 16)

          // 현재 위치 마커 추가
          if (window.L) {
            const L = window.L
            const locationIcon = L.divIcon({
              className: 'current-location-marker',
              html: `
                <div style="
                  background-color: #3b82f6;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  animation: pulse 2s infinite;
                ">
                </div>
                <style>
                  @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                  }
                </style>
              `,
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            })

            L.marker([latitude, longitude], { icon: locationIcon })
              .addTo(map)
              .bindPopup('현재 위치')
          }

          onLocationFound?.(latitude, longitude)
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

  // 지도 레이어 토글
  const toggleLayers = () => {
    if (!mapInstanceRef.current || !window.L) return

    const map = mapInstanceRef.current
    const L = window.L

    // 현재 타일 레이어 제거
    map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer)
      }
    })

    // 다른 타일 레이어 추가 (위성 이미지)
    const currentTile = map._currentTileType || 'street'

    if (currentTile === 'street') {
      // 위성 이미지로 변경
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '© Esri, Maxar, Earthstar Geographics',
        }
      ).addTo(map)
      map._currentTileType = 'satellite'
    } else {
      // 일반 지도로 변경
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)
      map._currentTileType = 'street'
    }
  }

  // 지도 필터 (마커 표시/숨김)
  const toggleFilter = () => {
    if (!mapInstanceRef.current) return

    const map = mapInstanceRef.current
    const isVisible = map._markersVisible !== false

    markersRef.current.forEach(marker => {
      if (isVisible) {
        map.removeLayer(marker)
      } else {
        map.addLayer(marker)
      }
    })

    map._markersVisible = !isVisible
  }

  // 지도 초기화
  useEffect(() => {
    if (!mapRef.current) return

    const loadLeaflet = async () => {
      try {
        setError(null)

        // CSS 먼저 로드
        await loadCSS('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css')

        // JavaScript 로드
        await loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js')

        // Leaflet이 로드될 때까지 대기
        let attempts = 0
        while (!window.L && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }

        if (!window.L) {
          throw new Error('Leaflet library failed to load')
        }

        const L = window.L

        // 기본 아이콘 설정
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })

        // 기존 지도 인스턴스 제거
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
        }

        // 지도 생성 - z-index 명시적 설정
        const map = L.map(mapRef.current, {
          zoomControl: false, // 기본 줌 컨트롤 비활성화
          attributionControl: false, // 기본 attribution 비활성화
          zoomSnap: 1,
          zoomDelta: 1,
        }).setView([center.lat, center.lng], zoom)

        // 지도 컨테이너의 z-index 설정
        if (mapRef.current) {
          mapRef.current.style.zIndex = '1'
        }

        // OpenStreetMap 타일 레이어 추가
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        map._currentTileType = 'street'
        map._markersVisible = true

        mapInstanceRef.current = map

        // 지도 컨트롤 함수들을 전역에 노출
        ;(window as any).mapControls = {
          findMyLocation,
          toggleLayers,
          toggleFilter,
        }

        // 마커 추가
        updateMarkers(L, map)
        setIsLoaded(true)
      } catch (err) {
        console.error('Leaflet loading error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      }
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      // 전역 컨트롤 정리
      if ((window as any).mapControls) {
        delete (window as any).mapControls
      }
    }
  }, [])

  // 마커 업데이트 함수
  const updateMarkers = (L: any, map: any) => {
    // 기존 마커 제거 (현재 위치 마커 제외)
    markersRef.current.forEach(marker => {
      if (map.hasLayer(marker)) {
        map.removeLayer(marker)
      }
    })
    markersRef.current = []

    // 새 마커 추가
    markers.forEach(markerData => {
      const isSelected = selectedMarkerId === markerData.id
      const color = getMarkerColor(markerData.type, isSelected)

      // 커스텀 마커 아이콘 생성
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: ${isSelected ? '28px' : '24px'};
            height: ${isSelected ? '28px' : '24px'};
            border-radius: 50% 50% 50% 0;
            border: 2px solid white;
            transform: rotate(-45deg);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            cursor: pointer;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: ${isSelected ? '12px' : '10px'};
              font-weight: bold;
            ">
              ${markerData.type.charAt(0).toUpperCase()}
            </div>
          </div>
        `,
        iconSize: [isSelected ? 28 : 24, isSelected ? 28 : 24],
        iconAnchor: [isSelected ? 14 : 12, isSelected ? 28 : 24],
      })

      const marker = L.marker(
        [markerData.position.lat, markerData.position.lng],
        {
          icon: customIcon,
        }
      ).addTo(map)

      // 마커 클릭 이벤트
      marker.on('click', () => {
        onMarkerClick(markerData.id)
      })

      // 팝업 추가
      marker.bindPopup(`
        <div style="min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #1f2937;">${markerData.title}</h3>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280;">${markerData.location}</p>
          <p style="margin: 0; font-size: 12px; font-weight: bold; color: #2563eb;">${markerData.price}</p>
        </div>
      `)

      markersRef.current.push(marker)
    })
  }

  // 마커 업데이트 (선택 상태 변경 시)
  useEffect(() => {
    if (mapInstanceRef.current && window.L && isLoaded) {
      updateMarkers(window.L, mapInstanceRef.current)
    }
  }, [markers, selectedMarkerId, isLoaded])

  // 지도 중심점 변경
  useEffect(() => {
    if (mapInstanceRef.current && isLoaded) {
      mapInstanceRef.current.setView([center.lat, center.lng], zoom)
    }
  }, [center, zoom, isLoaded])

  if (error) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
      >
        <div className="text-center p-6">
          <div className="text-red-500 text-lg font-semibold mb-2">
            지도 로딩 실패
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            새로고침
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{
          minHeight: '400px',
          zIndex: 1,
          position: 'relative',
        }}
      />
    </div>
  )
}

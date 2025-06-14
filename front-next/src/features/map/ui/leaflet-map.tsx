'use client'

import { useEffect, useRef, useState } from 'react'
import type { MapMarker } from '@/shared/types/map'

interface LeafletMapProps {
  center: { lat: number; lng: number }
  zoom: number
  markers: MapMarker[]
  selectedMarkerId: number | null
  onMarkerClick: (markerId: number) => void
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
  className = '',
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // 지도 초기화
  useEffect(() => {
    if (!mapRef.current) return

    const loadLeaflet = async () => {
      try {
        setIsLoading(true)
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

        // 지도 생성
        const map = L.map(mapRef.current, {
          zoomControl: false, // 기본 줌 컨트롤 비활성화
          attributionControl: false, // 기본 attribution 비활성화
        }).setView([center.lat, center.lng], zoom)

        // 줌 컨트롤을 우하단에 추가
        L.control
          .zoom({
            position: 'bottomright',
          })
          .addTo(map)

        // OpenStreetMap 타일 레이어 추가
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        mapInstanceRef.current = map

        // 마커 추가
        updateMarkers(L, map)
        setIsLoading(false)
      } catch (err) {
        console.error('Leaflet loading error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        setIsLoading(false)
      }
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // 마커 업데이트 함수
  const updateMarkers = (L: any, map: any) => {
    // 기존 마커 제거
    markersRef.current.forEach(marker => map.removeLayer(marker))
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
    if (mapInstanceRef.current && window.L) {
      updateMarkers(window.L, mapInstanceRef.current)
    }
  }, [markers, selectedMarkerId])

  // 지도 중심점 변경
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([center.lat, center.lng], zoom)
    }
  }, [center, zoom])

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

  if (isLoading) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 dark:border-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">
            지도를 불러오는 중...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className={`w-full h-full ${className}`}
        style={{ minHeight: '400px' }}
      />

      {/* 지도 정보 오버레이 */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md shadow-md p-2 text-xs text-gray-500 dark:text-gray-400 flex items-center z-[1000]">
        <span>© OpenStreetMap contributors</span>
      </div>
    </div>
  )
}

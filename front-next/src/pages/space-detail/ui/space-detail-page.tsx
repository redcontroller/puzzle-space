'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Star,
  Clock,
  Calendar,
  Copy,
  ChevronRight,
  Crown,
  Sparkles,
  Zap,
  Locate,
  Layers,
} from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel'
import { SpaceCard } from '@/entities/space/ui/space-card'
import { LeafletMap } from '@/features/map/ui/leaflet-map'
import { getSpaceDetail } from '@/shared/mock-data/space-detail'
import { savedSpaces } from '@/shared/mock-data/spaces'
import { cn } from '@/shared/lib/utils'
import type { MapMarker } from '@/shared/types/map'
import { SpaceDetail } from '@/shared/types/space-detail'

interface SpaceDetailPageProps {
  spaceId: number
}

export function SpaceDetailPage({ spaceId }: SpaceDetailPageProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 })
  const [mapZoom, setMapZoom] = useState(16)

  // spaceDetail을 useMemo로 메모이제이션하여 불필요한 재생성 방지
  const spaceDetail: SpaceDetail | null = useMemo(() => {
    return getSpaceDetail(spaceId)
  }, [spaceId])

  const nearbySpaces = useMemo(() => savedSpaces.slice(0, 5), [])

  // spaceDetail의 특정 값들만 의존성으로 사용하여 무한 루프 방지
  useEffect(() => {
    if (spaceDetail) {
      // 현재 값과 다를 때만 업데이트
      if (isFavorite !== (spaceDetail.isFavorite || false)) {
        setIsFavorite(spaceDetail.isFavorite || false)
      }
    }
  }, [spaceDetail, isFavorite])

  // 지도 중심점 설정을 별도 useEffect로 분리
  useEffect(() => {
    if (spaceDetail?.coordinates) {
      const newLat = spaceDetail.coordinates.lat
      const newLng = spaceDetail.coordinates.lng

      // 현재 좌표와 다를 때만 업데이트
      if (mapCenter.lat !== newLat || mapCenter.lng !== newLng) {
        setMapCenter({ lat: newLat, lng: newLng })
      }
    }
  }, [
    spaceDetail?.coordinates?.lat,
    spaceDetail?.coordinates?.lng,
    mapCenter.lat,
    mapCenter.lng,
  ])

  if (!spaceDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">공간 정보를 찾을 수 없습니다.</p>
      </div>
    )
  }

  // 현재 공간을 마커로 표시하기 위한 데이터 생성 - useMemo로 메모이제이션
  const spaceMarker: MapMarker = useMemo(
    () => ({
      id: spaceDetail.id,
      position: spaceDetail.coordinates,
      type: spaceDetail.imageType || 'office',
      title: spaceDetail.title,
      location: spaceDetail.location,
      price: spaceDetail.price,
      rating: spaceDetail.rating,
      imageType: spaceDetail.imageType,
      tags: spaceDetail.tags,
      isFavorite: spaceDetail.isFavorite || false,
    }),
    [
      spaceDetail.id,
      spaceDetail.coordinates,
      spaceDetail.imageType,
      spaceDetail.title,
      spaceDetail.location,
      spaceDetail.price,
      spaceDetail.rating,
      spaceDetail.images,
      spaceDetail.tags,
      spaceDetail.isFavorite,
    ]
  )

  const handleBack = () => {
    router.back()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: spaceDetail.title,
          text: spaceDetail.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('공유 취소됨')
      }
    } else {
      // 폴백: 클립보드에 URL 복사
      navigator.clipboard.writeText(window.location.href)
      alert('링크가 클립보드에 복사되었습니다.')
    }
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(spaceDetail.detailAddress)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    } catch (error) {
      console.error('주소 복사 실패:', error)
    }
  }

  const handleSpaceClick = (space: any) => {
    router.push(`/space/${space.id}`)
  }

  const handleMarkerClick = (markerId: number) => {
    console.log(`Marker ${markerId} clicked`)
  }

  const handleLocationFound = (lat: number, lng: number) => {
    setMapCenter({ lat, lng })
    setMapZoom(18)
  }

  const handleMyLocationClick = () => {
    const mapControls = (window as any).mapControls
    if (mapControls) {
      mapControls.findMyLocation()
    }
  }

  const handleLayerToggle = () => {
    const mapControls = (window as any).mapControls
    if (mapControls) {
      mapControls.toggleLayers()
    }
  }

  // 광고 타입별 아이콘 및 색상 - useMemo로 메모이제이션
  const getAdIcon = useMemo(() => {
    if (!spaceDetail.isAd) return null
    switch (spaceDetail.adType) {
      case 'premium':
        return <Crown className="h-4 w-4" />
      case 'featured':
        return <Sparkles className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }, [spaceDetail.isAd, spaceDetail.adType])

  const getAdBadgeColor = useMemo(() => {
    if (!spaceDetail.isAd) return ''
    switch (spaceDetail.adType) {
      case 'premium':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      case 'featured':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
      default:
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
    }
  }, [spaceDetail.isAd, spaceDetail.adType])

  const getAdBorderColor = useMemo(() => {
    if (!spaceDetail.isAd) return ''
    switch (spaceDetail.adType) {
      case 'premium':
        return 'border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
      case 'featured':
        return 'border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
      default:
        return 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
    }
  }, [spaceDetail.isAd, spaceDetail.adType])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              공간 상세 정보
            </h1>
            {spaceDetail.isAd && (
              <Badge className={cn('text-xs font-bold', getAdBadgeColor)}>
                {getAdIcon}
                <span className="ml-1">{spaceDetail.adBadge || 'AD'}</span>
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="h-8 w-8"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className={cn(
                'h-8 w-8',
                isFavorite ? 'text-red-500' : 'text-gray-500'
              )}
            >
              <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
            </Button>
          </div>
        </div>
      </header>

      <div className="pb-20">
        {/* 이미지 캐러셀 */}
        <div className="relative h-64">
          <Carousel>
            <CarouselContent>
              {spaceDetail.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-64">
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`${spaceDetail.title} 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {spaceDetail.isAd && index === 0 && (
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={cn('text-xs font-bold', getAdBadgeColor)}
                        >
                          {getAdIcon}
                          <span className="ml-1">
                            {spaceDetail.adBadge || 'AD'}
                          </span>
                        </Badge>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-3">
            {/* 광고 프로모션 텍스트 */}
            {spaceDetail.isAd && spaceDetail.promotionText && (
              <Card className={cn('border-2', getAdBorderColor)}>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300 text-center">
                    {spaceDetail.promotionText}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  공간번호 #{spaceDetail.id}
                  {spaceDetail.isAd && (
                    <span className="ml-2 text-xs font-medium text-purple-600 dark:text-purple-400">
                      {spaceDetail.adType?.toUpperCase()} 공간
                    </span>
                  )}
                </p>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {spaceDetail.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{spaceDetail.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{spaceDetail.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex flex-col items-end">
                  <p
                    className={cn(
                      'text-lg font-bold',
                      spaceDetail.isAd
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-blue-600 dark:text-blue-400'
                    )}
                  >
                    {spaceDetail.price}
                  </p>
                  {spaceDetail.isAd && spaceDetail.originalPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      {spaceDetail.originalPrice}
                    </p>
                  )}
                </div>
                {spaceDetail.floor && (
                  <p className="text-sm text-gray-500">{spaceDetail.floor}</p>
                )}
                {spaceDetail.area && (
                  <p className="text-sm text-gray-500">{spaceDetail.area}</p>
                )}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {spaceDetail.description}
            </p>
          </div>

          {/* 사용 기간 */}
          <Card
            className={spaceDetail.isAd ? cn('border-2', getAdBorderColor) : ''}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar
                  className={cn(
                    'h-4 w-4',
                    spaceDetail.isAd ? 'text-purple-600' : 'text-blue-600'
                  )}
                />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  설정된 사용 기간
                </h3>
                {spaceDetail.isAd && spaceDetail.adType === 'premium' && (
                  <Badge variant="outline" className="text-xs">
                    장기 이용 가능
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                최소 {spaceDetail.usagePeriod.minDays}일 ~ 최대{' '}
                {spaceDetail.usagePeriod.maxDays}일
              </p>
            </CardContent>
          </Card>

          {/* 공간 소개 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              공간 소개
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {spaceDetail.introduction}
            </p>
          </div>

          {/* 시설 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              시설
            </h3>
            <div className="flex flex-wrap gap-2">
              {spaceDetail.facilities.map((facility, index) => (
                <Badge
                  key={facility}
                  variant="outline"
                  className={cn(
                    'px-3 py-1',
                    spaceDetail.isAd && index < 3
                      ? 'border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300'
                      : ''
                  )}
                >
                  {facility}
                </Badge>
              ))}
            </div>
          </div>

          {/* 출입 가능 시간 */}
          <Card
            className={spaceDetail.isAd ? cn('border-2', getAdBorderColor) : ''}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock
                  className={cn(
                    'h-4 w-4',
                    spaceDetail.isAd ? 'text-purple-600' : 'text-blue-600'
                  )}
                />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  공간 출입 가능 시간
                </h3>
                {spaceDetail.isAd && spaceDetail.adType === 'premium' && (
                  <Badge variant="outline" className="text-xs">
                    24시간 이용
                  </Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    평일 (월~금)
                  </span>
                  <span className="font-medium">
                    {spaceDetail.accessHours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    주말 (토~일)
                  </span>
                  <span className="font-medium">
                    {spaceDetail.accessHours.weekends}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    공휴일
                  </span>
                  <span className="font-medium">
                    {spaceDetail.accessHours.holidays}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 위치 정보 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              위치
            </h3>

            {/* 실제 지도 */}
            <div className="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <LeafletMap
                center={mapCenter}
                zoom={mapZoom}
                markers={[spaceMarker]}
                selectedMarkerId={spaceDetail.id}
                onMarkerClick={handleMarkerClick}
                onLocationFound={handleLocationFound}
                className="w-full h-full"
              />

              {/* 지도 컨트롤 버튼들 */}
              <div className="absolute top-2 right-2 space-y-1">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md border-white/20 dark:border-gray-700/20"
                  onClick={handleMyLocationClick}
                  title="현재 위치"
                >
                  <Locate className="h-3 w-3" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md border-white/20 dark:border-gray-700/20"
                  onClick={handleLayerToggle}
                  title="지도 레이어 변경"
                >
                  <Layers className="h-3 w-3" />
                </Button>
              </div>

              {/* 지도 정보 오버레이 */}
              <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {spaceDetail.title}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  위도: {spaceDetail.coordinates.lat.toFixed(4)}, 경도:{' '}
                  {spaceDetail.coordinates.lng.toFixed(4)}
                </p>
              </div>
            </div>

            {/* 상세 주소 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      상세 주소
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {spaceDetail.detailAddress}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAddress}
                    className={cn(
                      'ml-2',
                      copiedAddress &&
                        'bg-green-50 border-green-200 text-green-700'
                    )}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    {copiedAddress ? '복사됨' : '복사'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 근처 다른 공간 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                근처 다른 공간
              </h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                더보기
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {nearbySpaces.map(space => (
                <div key={space.id} className="flex-shrink-0 w-72">
                  <SpaceCard
                    space={space}
                    onSpaceClick={handleSpaceClick}
                    onFavoriteClick={() => {}}
                    showFavoriteButton={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

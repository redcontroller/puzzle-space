export interface SpaceDetail {
  id: number
  title: string
  location: string
  price: string
  rating: number
  imageType: string
  tags: string[]
  isFavorite?: boolean
  floor?: string
  area?: string
  description: string
  introduction: string
  facilities: string[]
  usagePeriod: {
    minDays: number
    maxDays: number
  }
  accessHours: {
    weekdays: string
    weekends: string
    holidays: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  detailAddress: string
  images: string[]
  // 광고 공간 관련 필드 추가
  isAd?: boolean
  adType?: 'premium' | 'featured' | 'sponsored'
  adBadge?: string
  promotionText?: string
  originalPrice?: string
}

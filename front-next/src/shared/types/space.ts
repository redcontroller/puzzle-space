export interface Space {
  id: number
  title: string
  location: string
  price: string
  rating: number
  imageType: string
  tags: string[]
  isNew?: boolean
  isHot?: boolean
  isFavorite?: boolean // 찜하기 상태 추가
  floor?: string // 층수 정보 추가
  area?: string // 면적 정보 추가
}

export interface AdSpace extends Space {
  adType: 'premium' | 'featured' | 'sponsored'
  adBadge?: string
  promotionText?: string
  originalPrice?: string
}

export interface RecentSpace {
  id: number
  name: string
  imageType: string
  viewedAt: string
  isFavorite?: boolean // 찜하기 상태 추가
  floor?: string // 층수 정보 추가
  area?: string // 면적 정보 추가
}

export interface PopularSpace {
  id: number
  rank: number
  name: string
  views: string
}

export interface Stats {
  registeredSpaces: string
  successfulMatches: string
}

export type Category = string

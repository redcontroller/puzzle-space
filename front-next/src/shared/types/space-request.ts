export interface SpaceRequest {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    profileImage?: string
  }
  spaceType: string
  location: {
    region: string
    district?: string
    detailAddress?: string
  }
  budget: {
    min: number
    max: number
    period: 'daily' | 'monthly' | 'yearly'
  }
  purpose: string
  duration: {
    startDate: string
    endDate: string
    isFlexible: boolean
  }
  requirements: {
    area?: {
      min: number
      max: number
      unit: '평' | 'm²'
    }
    floor?: string
    facilities: string[] // 전기, 화장실, 인터넷 등
  }
  additionalRequirements?: string
  contact: {
    name: string
    phone: string
    email: string
    preferredContact: 'phone' | 'email' | 'both'
  }
  urgency: 'low' | 'medium' | 'high'
  status: 'pending' | 'processing' | 'matched' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt?: string
  views: number
  proposals: number // 임대인으로부터 받은 제안 수
  isMyRequest?: boolean // 내 요청인지 여부
}

export interface SpaceRequestFormData {
  title: string
  content: string
  spaceType: string
  region: string
  district: string
  detailAddress: string
  budgetMin: string
  budgetMax: string
  budgetPeriod: 'daily' | 'monthly' | 'yearly'
  purpose: string
  startDate: string
  endDate: string
  isFlexible: boolean
  areaMin: string
  areaMax: string
  areaUnit: '평' | 'm²'
  floor: string
  facilities: string[]
  additionalRequirements: string
  contactName: string
  contactPhone: string
  contactEmail: string
  preferredContact: 'phone' | 'email' | 'both'
  urgency: 'low' | 'medium' | 'high'
}

export interface SpaceRequestCardProps {
  request: SpaceRequest
  onClick?: (request: SpaceRequest) => void
  onEdit?: (request: SpaceRequest) => void
  onCancel?: (request: SpaceRequest) => void
  className?: string
}

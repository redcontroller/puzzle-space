import type {
  UserProfile,
  ActivityStats,
  AppSettings,
  CustomerSupportItem,
} from '@/shared/types/profile'

export const userProfile: UserProfile = {
  id: 'user123',
  nickname: '퍼즐러버',
  email: 'user@example.com',
  profileImage: '/placeholder.svg?height=80&width=80',
  joinDate: '2024-01-15',
  isVerified: true,
}

export const activityStats: ActivityStats = {
  registeredSpaces: 3,
  appliedSpaces: 12,
  requestedSpaces: 5,
  favoriteSpaces: 18,
}

export const appSettings: AppSettings = {
  notifications: {
    marketingConsent: true,
    pushNotifications: {
      matchingActivity: true,
      newSpaces: false,
      newRequests: true,
    },
    vibration: true,
  },
  user: {
    accountManagement: true,
    searchEngineIndexing: false,
    personalizedAds: true,
  },
  language: 'ko',
  version: '1.0.0',
}

export const customerSupportItems: CustomerSupportItem[] = [
  {
    id: 'notice',
    title: '공지사항',
    description: '서비스 업데이트 및 중요 공지',
    icon: '📢',
    href: '/notice',
  },
  {
    id: 'support',
    title: '고객센터',
    description: '문의사항 및 도움말',
    icon: '💬',
    href: '/support',
  },
  {
    id: 'partnership',
    title: '제휴/협업문의',
    description: '비즈니스 파트너십 문의',
    icon: '🤝',
    href: '/partnership',
  },
  {
    id: 'terms',
    title: '약관 및 정책',
    description: '이용약관, 개인정보처리방침',
    icon: '📋',
    href: '/terms',
  },
]

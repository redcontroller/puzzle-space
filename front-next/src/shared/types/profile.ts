export interface UserProfile {
  id: string
  nickname: string
  email: string
  profileImage?: string
  joinDate: string
  isVerified: boolean
}

export interface ActivityStats {
  registeredSpaces: number
  appliedSpaces: number
  requestedSpaces: number
  favoriteSpaces: number
}

export interface NotificationSettings {
  marketingConsent: boolean
  pushNotifications: {
    matchingActivity: boolean
    newSpaces: boolean
    newRequests: boolean
  }
  vibration: boolean
}

export interface UserSettings {
  accountManagement: boolean
  searchEngineIndexing: boolean
  personalizedAds: boolean
}

export interface AppSettings {
  notifications: NotificationSettings
  user: UserSettings
  language: string
  version: string
}

export interface CustomerSupportItem {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

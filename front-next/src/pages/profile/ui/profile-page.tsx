'use client'

import { ProfileInfo } from '@/features/profile/ui/profile-info'
import { ActivityStatsSection } from '@/features/profile/ui/activity-stats'
import { CustomerSupportSection } from '@/features/profile/ui/customer-support'
import {
  userProfile,
  activityStats,
  customerSupportItems,
} from '@/shared/mock-data/profile'
import type { CustomerSupportItem } from '@/shared/types/profile'

export function ProfilePage() {
  const handleEditProfile = () => {
    console.log('Edit profile clicked')
    // 프로필 수정 페이지로 이동 또는 모달 표시
  }

  const handleViewRegisteredSpaces = () => {
    console.log('View registered spaces')
    // 등록공간 목록 페이지로 이동
  }

  const handleViewAppliedSpaces = () => {
    console.log('View applied spaces')
    // 신청공간 목록 페이지로 이동
  }

  const handleViewRequestedSpaces = () => {
    console.log('View requested spaces')
    // 요청공간 목록 페이지로 이동
  }

  const handleViewFavoriteSpaces = () => {
    console.log('View favorite spaces')
    // 찜공간 목록 페이지로 이동
  }

  const handleCustomerSupportClick = (item: CustomerSupportItem) => {
    console.log('Customer support item clicked:', item.title)
    // 해당 페이지로 이동
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      style={{ paddingBottom: 'var(--sizes-nav-height)' }}
    >
      {/* 프로필 정보 */}
      <ProfileInfo profile={userProfile} onEditProfile={handleEditProfile} />

      {/* 활동 정보 */}
      <div className="mb-4">
        <ActivityStatsSection
          stats={activityStats}
          onViewRegisteredSpaces={handleViewRegisteredSpaces}
          onViewAppliedSpaces={handleViewAppliedSpaces}
          onViewRequestedSpaces={handleViewRequestedSpaces}
          onViewFavoriteSpaces={handleViewFavoriteSpaces}
        />
      </div>

      {/* 고객지원 */}
      <div className="mb-4">
        <CustomerSupportSection
          items={customerSupportItems}
          onItemClick={handleCustomerSupportClick}
        />
      </div>
    </div>
  )
}

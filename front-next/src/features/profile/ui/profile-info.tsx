'use client'

import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Edit, CheckCircle } from 'lucide-react'
import type { UserProfile } from '@/shared/types/profile'

interface ProfileInfoProps {
  profile: UserProfile
  onEditProfile: () => void
}

export function ProfileInfo({ profile, onEditProfile }: ProfileInfoProps) {
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 가입`
  }

  return (
    <div style={{ padding: 'var(--sizes-layout-padding)' }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  profile.profileImage || '/placeholder.svg?height=80&width=80'
                }
                alt="프로필 이미지"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
              {profile.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {profile.nickname}
                </h2>
                {profile.isVerified && (
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs">
                    인증됨
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {profile.email}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {formatJoinDate(profile.joinDate)}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onEditProfile}
              className="flex items-center gap-1"
            >
              <Edit className="h-3 w-3" />
              수정
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

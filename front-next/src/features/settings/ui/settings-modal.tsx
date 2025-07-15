'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import {
  X,
  Bell,
  User,
  Globe,
  LogOut,
  UserX,
  ChevronRight,
  SettingsIcon,
} from 'lucide-react'
import type { AppSettings } from '@/shared/types/profile'

interface SettingsModalProps {
  isOpen: boolean
  settings: AppSettings
  onClose: () => void
  onSettingsChange: (settings: AppSettings) => void
  onLogout: () => void
  onDeleteAccount: () => void
}

export function SettingsModal({
  isOpen,
  settings,
  onClose,
  onSettingsChange,
  onLogout,
  onDeleteAccount,
}: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  // 설정이 변경될 때마다 localSettings 업데이트
  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  // localSettings가 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    // 초기 렌더링 시에는 부모 컴포넌트 상태를 업데이트하지 않음
    if (JSON.stringify(localSettings) !== JSON.stringify(settings)) {
      onSettingsChange(localSettings)
    }
  }, [localSettings, onSettingsChange, settings])

  if (!isOpen) return null

  const handleToggle = (
    section: keyof AppSettings,
    key: string,
    subKey?: string
  ) => {
    setLocalSettings(prev => {
      const newSettings = { ...prev }

      if (section === 'notifications' && subKey) {
        newSettings.notifications = {
          ...prev.notifications,
          pushNotifications: {
            ...prev.notifications.pushNotifications,
            [subKey]:
              !prev.notifications.pushNotifications[
                subKey as keyof typeof prev.notifications.pushNotifications
              ],
          },
        }
      } else if (section === 'notifications') {
        newSettings.notifications = {
          ...prev.notifications,
          [key]: !prev.notifications[key as keyof typeof prev.notifications],
        }
      } else if (section === 'user') {
        newSettings.user = {
          ...prev.user,
          [key]: !prev.user[key as keyof typeof prev.user],
        }
      }

      return newSettings
    })
  }

  const handleLanguageChange = () => {
    const newLanguage = localSettings.language === 'ko' ? 'en' : 'ko'
    setLocalSettings(prev => ({ ...prev, language: newLanguage }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-t-xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />앱 설정
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* 알림 설정 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-600" />
                알림 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">마케팅 수신 동의</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    이벤트 및 혜택 정보
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleToggle('notifications', 'marketingConsent')
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.notifications.marketingConsent
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.notifications.marketingConsent
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-sm">푸시 알림</p>

                <div className="flex items-center justify-between pl-4">
                  <span className="text-sm">매칭 활동 알림</span>
                  <button
                    onClick={() =>
                      handleToggle(
                        'notifications',
                        'pushNotifications',
                        'matchingActivity'
                      )
                    }
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      localSettings.notifications.pushNotifications
                        .matchingActivity
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        localSettings.notifications.pushNotifications
                          .matchingActivity
                          ? 'translate-x-5'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pl-4">
                  <span className="text-sm">신규 등록 공간 알림</span>
                  <button
                    onClick={() =>
                      handleToggle(
                        'notifications',
                        'pushNotifications',
                        'newSpaces'
                      )
                    }
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      localSettings.notifications.pushNotifications.newSpaces
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        localSettings.notifications.pushNotifications.newSpaces
                          ? 'translate-x-5'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pl-4">
                  <span className="text-sm">신규 요청 공간 알림</span>
                  <button
                    onClick={() =>
                      handleToggle(
                        'notifications',
                        'pushNotifications',
                        'newRequests'
                      )
                    }
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      localSettings.notifications.pushNotifications.newRequests
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        localSettings.notifications.pushNotifications
                          .newRequests
                          ? 'translate-x-5'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">진동</span>
                <button
                  onClick={() => handleToggle('notifications', 'vibration')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.notifications.vibration
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.notifications.vibration
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* 사용자 설정 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-green-600" />
                사용자 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">계정 관리</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    프로필 및 계정 정보
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">검색 엔진 허용하기</span>
                <button
                  onClick={() => handleToggle('user', 'searchEngineIndexing')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.user.searchEngineIndexing
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.user.searchEngineIndexing
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">맞춤형 광고 허용</span>
                <button
                  onClick={() => handleToggle('user', 'personalizedAds')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.user.personalizedAds
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.user.personalizedAds
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* 기타 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-600" />
                기타
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">언어 설정</span>
                <button
                  onClick={handleLanguageChange}
                  className="flex items-center gap-2"
                >
                  <Badge variant="outline" className="text-xs">
                    {localSettings.language === 'ko' ? '한국어' : 'English'}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">버전</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  v{localSettings.version}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">로그아웃</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>

              <button
                onClick={onDeleteAccount}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <UserX className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    탈퇴하기
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-red-400" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

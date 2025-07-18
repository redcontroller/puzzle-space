'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import {
  Bell,
  User,
  Globe,
  ChevronRight,
  LogOut,
  AlertTriangle,
} from 'lucide-react'
import { appSettings } from '@/shared/mock-data/profile'
import type { AppSettings } from '@/shared/types/profile'

export default function SettingsPage() {
  const [localSettings, setLocalSettings] = useState(appSettings)
  const [showPopup, setShowPopup] = useState<string | null>(null)

  const handleToggle = (
    section: keyof AppSettings,
    key: string,
    subKey?: string
  ) => {
    setLocalSettings((prev: AppSettings) => {
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

      // 설정 변경 시 로컬 스토리지나 API에 저장하는 로직 추가 가능
      console.log('Settings updated:', newSettings)
      return newSettings
    })
  }

  const handleItemClick = (itemType: string) => {
    setShowPopup(itemType)
    // 모달이 열릴 때 body에 overflow-hidden 클래스 추가
    document.body.classList.add('overflow-hidden')
  }

  const handleClosePopup = () => {
    setShowPopup(null)
    // 모달이 닫힐 때 body에서 overflow-hidden 클래스 제거
    document.body.classList.remove('overflow-hidden')
  }

  const handleLogout = () => {
    console.log('Logout confirmed')
    // 로그아웃 처리
    handleClosePopup()
    // 실제 로그아웃 로직 실행
    setTimeout(() => {
      alert('로그아웃되었습니다.')
      window.location.href = '/'
    }, 100)
  }

  const handleDeleteAccount = () => {
    console.log('Delete account confirmed')
    // 탈퇴 처리
    handleClosePopup()
    // 실제 탈퇴 로직 실행
    setTimeout(() => {
      alert('탈퇴 처리되었습니다.')
      window.location.href = '/'
    }, 100)
  }

  // 통일된 토글 버튼 컴포넌트
  const ToggleButton = ({
    isOn,
    onClick,
  }: {
    isOn: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        isOn ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  // 클릭 가능한 항목 컴포넌트
  const ClickableItem = ({
    children,
    onClick,
    className = '',
  }: {
    children: React.ReactNode
    onClick: () => void
    className?: string
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors text-left ${className}`}
    >
      {children}
    </button>
  )

  // 정보 팝업 컴포넌트
  const InfoPopup = ({
    title,
    content,
    onClose,
  }: {
    title: string
    content: string
    onClose: () => void
  }) => (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-line">
          {content}
        </p>
        <Button onClick={onClose} className="w-full">
          확인
        </Button>
      </div>
    </div>
  )

  // 확인 팝업 컴포넌트
  const ConfirmPopup = ({
    title,
    content,
    confirmText,
    cancelText = '취소',
    onConfirm,
    onCancel,
    variant = 'default',
  }: {
    title: string
    content: string
    confirmText: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
    variant?: 'default' | 'destructive'
  }) => (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          {variant === 'destructive' && (
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          )}
          {variant === 'default' && (
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <LogOut className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-line">
          {content}
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 ${
              variant === 'destructive'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 body에서 overflow-hidden 클래스 제거
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      style={{ paddingBottom: 'var(--sizes-nav-height)' }}
    >
      {/* 메인 콘텐츠 */}
      <div
        style={{
          paddingTop: 'var(--sizes-layout-padding)',
          paddingLeft: 'var(--sizes-layout-padding)',
          paddingRight: 'var(--sizes-layout-padding)',
          paddingBottom: 'var(--sizes-layout-padding)',
        }}
        className="space-y-4"
      >
        {/* 알림 설정 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-blue-600" />
              알림 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-3">
              <p className="font-medium text-sm mb-3">푸시 알림</p>
              <div className="space-y-3 pl-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">매칭 활동 알림</span>
                  <ToggleButton
                    isOn={
                      localSettings.notifications.pushNotifications
                        .matchingActivity
                    }
                    onClick={() =>
                      handleToggle(
                        'notifications',
                        'pushNotifications',
                        'matchingActivity'
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">신규 등록 공간 알림</span>
                  <ToggleButton
                    isOn={
                      localSettings.notifications.pushNotifications.newSpaces
                    }
                    onClick={() =>
                      handleToggle(
                        'notifications',
                        'pushNotifications',
                        'newSpaces'
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">신규 요청 공간 알림</span>
                  <ToggleButton
                    isOn={
                      localSettings.notifications.pushNotifications.newRequests
                    }
                    onClick={() =>
                      handleToggle(
                        'notifications',
                        'pushNotifications',
                        'newRequests'
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-medium">진동</span>
              <ToggleButton
                isOn={localSettings.notifications.vibration}
                onClick={() => handleToggle('notifications', 'vibration')}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-sm">마케팅 수신 동의</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  이벤트 및 혜택 정보
                </p>
              </div>
              <ToggleButton
                isOn={localSettings.notifications.marketingConsent}
                onClick={() =>
                  handleToggle('notifications', 'marketingConsent')
                }
              />
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
          <CardContent className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
            <ClickableItem onClick={() => handleItemClick('account')}>
              <div>
                <p className="font-medium text-sm">계정 관리</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  프로필 및 계정 정보
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </ClickableItem>

            <div className="flex items-center justify-between py-3">
              <span className="text-sm">검색 엔진 허용하기</span>
              <ToggleButton
                isOn={localSettings.user.searchEngineIndexing}
                onClick={() => handleToggle('user', 'searchEngineIndexing')}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-sm">맞춤형 광고 허용</span>
              <ToggleButton
                isOn={localSettings.user.personalizedAds}
                onClick={() => handleToggle('user', 'personalizedAds')}
              />
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
          <CardContent className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
            <ClickableItem onClick={() => handleItemClick('language')}>
              <span className="text-sm">언어 설정</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {localSettings.language === 'ko' ? '한국어' : 'English'}
                </Badge>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </ClickableItem>

            <ClickableItem onClick={() => handleItemClick('version')}>
              <span className="text-sm">버전</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  v{localSettings.version}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </ClickableItem>

            <ClickableItem onClick={() => handleItemClick('logout')}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">로그아웃</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </ClickableItem>

            <ClickableItem onClick={() => handleItemClick('deleteAccount')}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">탈퇴하기</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </ClickableItem>
          </CardContent>
        </Card>
      </div>

      {/* 정보 팝업들 */}
      {showPopup === 'account' && (
        <InfoPopup
          title="계정 관리"
          content="프로필 수정, 비밀번호 변경 등의 계정 관리 기능은 추후 업데이트 예정입니다."
          onClose={handleClosePopup}
        />
      )}

      {showPopup === 'language' && (
        <InfoPopup
          title="언어 설정"
          content="현재 한국어와 영어를 지원합니다. 추가 언어는 향후 업데이트에서 제공될 예정입니다."
          onClose={handleClosePopup}
        />
      )}

      {showPopup === 'version' && (
        <InfoPopup
          title="앱 버전"
          content={`현재 버전: v${localSettings.version}\n최신 버전을 사용 중입니다. 새로운 업데이트가 있을 때 알려드리겠습니다.`}
          onClose={handleClosePopup}
        />
      )}

      {/* 확인 팝업들 */}
      {showPopup === 'logout' && (
        <ConfirmPopup
          title="로그아웃"
          content="정말로 로그아웃 하시겠습니까?"
          confirmText="로그아웃"
          onConfirm={handleLogout}
          onCancel={handleClosePopup}
          variant="default"
        />
      )}

      {showPopup === 'deleteAccount' && (
        <ConfirmPopup
          title="계정 탈퇴"
          content="정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며,\n이 작업은 되돌릴 수 없습니다."
          confirmText="탈퇴하기"
          onConfirm={handleDeleteAccount}
          onCancel={handleClosePopup}
          variant="destructive"
        />
      )}
    </div>
  )
}

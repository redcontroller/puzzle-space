'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Input } from '@/shared/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import { SpaceRequestForm } from '@/features/space-request/ui/space-request-form'
import { SpaceRequestCard } from '@/entities/space-request/ui/space-request-card'
import {
  MessageSquarePlus,
  Plus,
  Search,
  Clock,
  CheckCircle,
  TrendingUp,
  SlidersHorizontal,
  XCircle,
} from 'lucide-react'
import type {
  SpaceRequestFormData,
  SpaceRequest,
} from '@/shared/types/space-request'
import {
  spaceRequests,
  mySpaceRequests,
} from '@/shared/mock-data/space-requests'

export default function SpaceRequestPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  // 필터링된 요청 목록
  const filteredRequests = spaceRequests.filter(request => {
    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = request.title.toLowerCase().includes(query)
      const matchesContent = request.content.toLowerCase().includes(query)
      const matchesLocation =
        request.location.region.toLowerCase().includes(query) ||
        (request.location.district &&
          request.location.district.toLowerCase().includes(query))

      if (!(matchesTitle || matchesContent || matchesLocation)) {
        return false
      }
    }

    // 탭 필터링
    if (activeTab === 'my' && !request.isMyRequest) {
      return false
    }

    // 공간 유형 필터링
    if (selectedType && request.spaceType !== selectedType) {
      return false
    }

    // 긴급도 필터링
    if (selectedUrgency && request.urgency !== selectedUrgency) {
      return false
    }

    // 상태 필터링
    if (selectedStatus && request.status !== selectedStatus) {
      return false
    }

    return true
  })

  const handleFormSubmit = (formData: SpaceRequestFormData) => {
    // 실제 구현에서는 API 호출로 데이터 저장
    console.log('Form submitted:', formData)
    setShowForm(false)

    // 성공 알림 (실제 앱에서는 toast 등 사용)
    alert('공간 요청이 성공적으로 제출되었습니다!')
  }

  const handleRequestClick = (request: SpaceRequest) => {
    console.log('Request clicked:', request)
    // 상세 페이지로 이동 또는 모달 표시 등의 로직
  }

  const spaceTypes = [
    { id: 'office', label: '사무실' },
    { id: 'warehouse', label: '창고' },
    { id: 'retail', label: '상가' },
    { id: 'studio', label: '스튜디오' },
    { id: 'parking', label: '주차장' },
    { id: 'workshop', label: '공방' },
  ]

  const urgencyOptions = [
    { id: 'high', label: '급함', icon: Clock },
    { id: 'medium', label: '보통', icon: TrendingUp },
    { id: 'low', label: '여유', icon: CheckCircle },
  ]

  const statusOptions = [
    { id: 'pending', label: '대기중', icon: Clock, color: 'text-yellow-600' },
    {
      id: 'processing',
      label: '처리중',
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      id: 'matched',
      label: '매칭완료',
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      id: 'completed',
      label: '완료',
      icon: CheckCircle,
      color: 'text-gray-600',
    },
    { id: 'cancelled', label: '취소됨', icon: XCircle, color: 'text-red-600' },
  ]

  // 필터 초기화 함수
  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedType(null)
    setSelectedUrgency(null)
    setSelectedStatus(null)
  }

  // 활성 필터 개수 계산
  const activeFiltersCount = [
    selectedType,
    selectedUrgency,
    selectedStatus,
    searchQuery,
  ].filter(Boolean).length

  if (showForm) {
    return (
      <div
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
        style={{
          paddingTop: 'var(--sizes-layout-padding)',
          paddingLeft: 'var(--sizes-layout-padding)',
          paddingRight: 'var(--sizes-layout-padding)',
          paddingBottom: 'var(--sizes-nav-height)',
        }}
      >
        <SpaceRequestForm
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      style={{ paddingBottom: 'var(--sizes-nav-height)' }}
    >
      {/* 새 요청 버튼 섹션 */}
      <div
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        style={{
          paddingTop: 'var(--sizes-layout-padding)',
          paddingLeft: 'var(--sizes-layout-padding)',
          paddingRight: 'var(--sizes-layout-padding)',
          paddingBottom: 'var(--sizes-layout-padding)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              원하는 공간을 요청하고 맞춤 매칭을 받아보세요
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />새 요청
          </Button>
        </div>
      </div>

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
        {/* 검색 및 필터 */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon" className="relative">
            <SlidersHorizontal className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* 필터 옵션 */}
        <div className="space-y-3">
          {/* 상태 필터 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">상태</p>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs h-6 px-2"
                >
                  전체 초기화
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedStatus === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedStatus(null)}
              >
                전체 ({spaceRequests.length})
              </Badge>
              {statusOptions.map(status => {
                const count = spaceRequests.filter(
                  r => r.status === status.id
                ).length
                return (
                  <Badge
                    key={status.id}
                    variant={
                      selectedStatus === status.id ? 'default' : 'outline'
                    }
                    className={`cursor-pointer ${
                      selectedStatus === status.id ? '' : status.color
                    }`}
                    onClick={() => setSelectedStatus(status.id)}
                  >
                    <status.icon className="h-3 w-3 mr-1" />
                    {status.label} ({count})
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* 공간 유형 필터 */}
          <div>
            <p className="text-sm font-medium mb-2">공간 유형</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedType === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedType(null)}
              >
                전체
              </Badge>
              {spaceTypes.map(type => (
                <Badge
                  key={type.id}
                  variant={selectedType === type.id ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* 긴급도 필터 */}
          <div>
            <p className="text-sm font-medium mb-2">긴급도</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedUrgency === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedUrgency(null)}
              >
                전체
              </Badge>
              {urgencyOptions.map(option => (
                <Badge
                  key={option.id}
                  variant={
                    selectedUrgency === option.id ? 'default' : 'outline'
                  }
                  className="cursor-pointer"
                  onClick={() => setSelectedUrgency(option.id)}
                >
                  <option.icon className="h-3 w-3 mr-1" />
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 활성 필터 표시 */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              활성 필터 ({activeFiltersCount}개):
            </span>
            <div className="flex flex-wrap gap-1">
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  검색: "{searchQuery}"
                </Badge>
              )}
              {selectedStatus && (
                <Badge variant="secondary" className="text-xs">
                  상태:{' '}
                  {statusOptions.find(s => s.id === selectedStatus)?.label}
                </Badge>
              )}
              {selectedType && (
                <Badge variant="secondary" className="text-xs">
                  유형: {spaceTypes.find(t => t.id === selectedType)?.label}
                </Badge>
              )}
              {selectedUrgency && (
                <Badge variant="secondary" className="text-xs">
                  긴급도:{' '}
                  {urgencyOptions.find(u => u.id === selectedUrgency)?.label}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* 탭 및 요청 목록 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="all">
              전체 요청 (
              {activeTab === 'all'
                ? filteredRequests.length
                : spaceRequests.length}
              )
            </TabsTrigger>
            <TabsTrigger value="my">
              내 요청 (
              {activeTab === 'my'
                ? filteredRequests.length
                : mySpaceRequests.length}
              )
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {filteredRequests.length > 0 ? (
              <div className="space-y-3">
                {filteredRequests.map(request => (
                  <SpaceRequestCard
                    key={request.id}
                    request={request}
                    onClick={handleRequestClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquarePlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {activeFiltersCount > 0
                    ? '검색 결과가 없습니다'
                    : '아직 요청이 없습니다'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {activeFiltersCount > 0
                    ? '다른 조건으로 검색해보세요'
                    : '첫 번째 공간 요청을 작성해보세요'}
                </p>
                {activeFiltersCount > 0 ? (
                  <Button variant="outline" onClick={clearAllFilters}>
                    필터 초기화
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />첫 번째 요청하기
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my" className="mt-4">
            {mySpaceRequests.length > 0 ? (
              <div className="space-y-3">
                {mySpaceRequests
                  .filter(request => {
                    // 내 요청에도 검색 및 필터 적용
                    if (searchQuery) {
                      const query = searchQuery.toLowerCase()
                      const matchesTitle = request.title
                        .toLowerCase()
                        .includes(query)
                      const matchesContent = request.content
                        .toLowerCase()
                        .includes(query)
                      const matchesLocation =
                        request.location.region.toLowerCase().includes(query) ||
                        (request.location.district &&
                          request.location.district
                            .toLowerCase()
                            .includes(query))

                      if (
                        !(matchesTitle || matchesContent || matchesLocation)
                      ) {
                        return false
                      }
                    }

                    if (selectedType && request.spaceType !== selectedType) {
                      return false
                    }

                    if (
                      selectedUrgency &&
                      request.urgency !== selectedUrgency
                    ) {
                      return false
                    }

                    if (selectedStatus && request.status !== selectedStatus) {
                      return false
                    }

                    return true
                  })
                  .map(request => (
                    <SpaceRequestCard
                      key={request.id}
                      request={request}
                      onClick={handleRequestClick}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquarePlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  내 요청이 없습니다
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  원하는 공간을 요청해보세요
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />새 요청 작성
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

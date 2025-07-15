'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'

import { ManualSection } from '@/widgets/manual-section/ui/manual-section'
import { Footer } from '@/widgets/footer/ui/footer'
import { SearchSpaces } from '@/features/search-spaces/ui/search-spaces'
import { StatsSection } from '@/widgets/stats-section/ui/stats-section'
import { RecommendedSpacesSection } from '@/widgets/recommended-spaces/ui/recommended-spaces-section'
import { RecentSpacesSection } from '@/widgets/recent-spaces/ui/recent-spaces-section'
import { PopularSpacesSection } from '@/widgets/popular-spaces/ui/popular-spaces-section'

import { categories } from '@/shared/mock-data/categories'
import {
  recommendedSpaces,
  recentSpaces,
  popularSpaces,
  adSpaces,
  savedSpaces,
} from '@/shared/mock-data/spaces'
import { appStats } from '@/shared/mock-data/stats'
import type {
  Space,
  RecentSpace,
  PopularSpace,
  AdSpace,
} from '@/shared/types/space'

export function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([])
  const [filteredAdSpaces, setFilteredAdSpaces] = useState<AdSpace[]>([])
  const [isSearchActive, setIsSearchActive] = useState(false)

  // 홈 페이지 로드 시 스크롤을 최상위로 이동
  useEffect(() => {
    // requestAnimationFrame을 사용하여 다음 프레임에서 실행
    // DOM 렌더링이 완료된 후 실행됨
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        // behavior: 'smooth',
      })
    }

    // 다음 프레임에서 실행하여 렌더링 완료 보장
    requestAnimationFrame(scrollToTop)
  }, [])

  // 데이터가 없을 경우를 위한 기본값 설정
  const safeCategories = categories || []
  const safeRecommendedSpaces = recommendedSpaces || []
  const safeSavedSpaces = savedSpaces || []
  const safeRecentSpaces = recentSpaces || []
  const safePopularSpaces = popularSpaces || []
  const safeAdSpaces = adSpaces || []
  const safeAppStats = appStats || {
    registeredSpaces: '0',
    successfulMatches: '0',
  }

  // 검색어와 카테고리에 따라 공간 필터링
  useEffect(() => {
    let filtered = [...safeSavedSpaces]
    let filteredAds = [...safeAdSpaces]

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      const categoryTagMap: Record<string, string[]> = {
        사무실: ['사무실', '오피스', '워크스페이스', '비즈니스'],
        창고: ['창고', '물류', '보관'],
        상가: ['상가', '매장', '가게', '숍'],
        스튜디오: ['스튜디오', '촬영', '녹음'],
        주차장: ['주차', '주차장'],
        공방: [
          '공방',
          '작업실',
          '공예',
          '도예',
          '목공예',
          '가죽공예',
          '유리공예',
        ],
      }

      const matchingTags = categoryTagMap[selectedCategory] || [
        selectedCategory.toLowerCase(),
      ]

      filtered = filtered.filter(space => {
        const titleMatch = space.title
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
        const tagMatch = space.tags.some(tag =>
          matchingTags.some(matchTag =>
            tag.toLowerCase().includes(matchTag.toLowerCase())
          )
        )
        return titleMatch || tagMatch
      })

      filteredAds = filteredAds.filter(space => {
        const titleMatch = space.title
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
        const tagMatch = space.tags.some(tag =>
          matchingTags.some(matchTag =>
            tag.toLowerCase().includes(matchTag.toLowerCase())
          )
        )
        return titleMatch || tagMatch
      })
    }

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()

      filtered = filtered.filter(
        space =>
          space.title.toLowerCase().includes(query) ||
          space.location.toLowerCase().includes(query) ||
          space.tags.some(tag => tag.toLowerCase().includes(query))
      )

      filteredAds = filteredAds.filter(
        space =>
          space.title.toLowerCase().includes(query) ||
          space.location.toLowerCase().includes(query) ||
          space.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setFilteredSpaces(filtered)
    setFilteredAdSpaces(filteredAds)
    setIsSearchActive(searchQuery.trim() !== '' || selectedCategory !== '전체')
  }, [searchQuery, selectedCategory, safeSavedSpaces, safeAdSpaces])

  // 검색 관련 핸들러들
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setSelectedCategory('전체')
    setIsSearchActive(false)
  }

  const handleFilterClick = () => {
    console.log('Filter button clicked')
  }

  // 공간 카드 이벤트 핸들러들
  const handleSpaceClick = (space: Space | AdSpace) => {
    console.log('Space clicked:', space.title)
    router.push(`/space/${space.id}`)
  }

  const handleFavoriteClick = (space: Space | AdSpace) => {
    console.log('Favorite clicked:', space.title)
  }

  const handleAdClick = (adSpace: AdSpace) => {
    console.log('Ad clicked:', adSpace.title, 'Type:', adSpace.adType)
    router.push(`/space/${adSpace.id}`)
  }

  const handleRecentSpaceClick = (space: RecentSpace) => {
    console.log('Recent space clicked:', space.name)
    router.push(`/space/${space.id}`)
  }

  const handlePopularSpaceClick = (space: PopularSpace) => {
    console.log('Popular space clicked:', space.name)
    router.push(`/space/${space.id}`)
  }

  // 빈 상태 컴포넌트
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
      <AlertCircle className="h-12 w-12 mb-2 opacity-50" />
      <p className="text-sm text-center">{message}</p>
    </div>
  )

  // 검색 결과 통합 (광고 + 일반 공간)
  const totalSearchResults = filteredAdSpaces.length + filteredSpaces.length

  return (
    <>
      {/* 검색 및 필터링 컴포넌트 */}
      <SearchSpaces
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={safeCategories}
        resultCount={isSearchActive ? totalSearchResults : undefined}
        isSearchActive={isSearchActive}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onClearSearch={handleClearSearch}
        onFilterClick={handleFilterClick}
      />

      {/* 통계 섹션 - 검색 중이 아닐 때만 표시 */}
      {!isSearchActive && <StatsSection stats={safeAppStats} />}

      {/* 추천 공간 또는 검색 결과 */}
      <RecommendedSpacesSection
        isSearchActive={isSearchActive}
        filteredSpaces={filteredSpaces}
        filteredAdSpaces={filteredAdSpaces}
        recommendedSpaces={safeRecommendedSpaces}
        adSpaces={safeAdSpaces}
        totalSearchResults={totalSearchResults}
        onSpaceClick={handleSpaceClick}
        onFavoriteClick={handleFavoriteClick}
        onAdClick={handleAdClick}
        EmptyState={EmptyState}
      />

      {/* 최근 본 공간 - 검색 중이 아닐 때만 표시 */}
      {!isSearchActive && (
        <RecentSpacesSection
          recentSpaces={safeRecentSpaces}
          onRecentSpaceClick={handleRecentSpaceClick}
          EmptyState={EmptyState}
        />
      )}

      {/* 이번 주 인기 공간 - 검색 중이 아닐 때만 표시 */}
      {!isSearchActive && (
        <PopularSpacesSection
          popularSpaces={safePopularSpaces}
          onPopularSpaceClick={handlePopularSpaceClick}
          EmptyState={EmptyState}
        />
      )}

      {/* 매뉴얼 섹션 - 검색 중이 아닐 때만 표시 */}
      {!isSearchActive && <ManualSection />}

      {/* 푸터 컴포넌트 */}
      <Footer />
    </>
  )
}

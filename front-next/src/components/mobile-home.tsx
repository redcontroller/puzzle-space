'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MobileHeader from '@/components/common/mobile-header';
import MobileNavigation from '@/components/common/mobile-navigation';
import SearchAndFilter from '@/components/common/search-and-filter';
import SpaceItem from '@/components/common/space-item';
import RecentSpaceCard from '@/components/common/recent-space-card';
import PopularSpaceItem from '@/components/common/popular-space-item';
import Footer from '@/components/common/footer';
import { TrendingUp, Users, Calendar, ArrowRight, AlertCircle } from 'lucide-react';

import { categories } from '@/shared/mock-data/categories';
import { recommendedSpaces, recentSpaces, popularSpaces, adSpaces, savedSpaces } from '@/shared/mock-data/spaces';
import { appStats } from '@/shared/mock-data/stats';
import type { Space, RecentSpace, PopularSpace, AdSpace } from '@/shared/types/space';

export default function MobileHome() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]);
  const [filteredAdSpaces, setFilteredAdSpaces] = useState<AdSpace[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // 데이터가 없을 경우를 위한 기본값 설정
  const safeCategories = categories || [];
  const safeRecommendedSpaces = recommendedSpaces || [];
  const safeSavedSpaces = savedSpaces || [];
  const safeRecentSpaces = recentSpaces || [];
  const safePopularSpaces = popularSpaces || [];
  const safeAdSpaces = adSpaces || [];
  const safeAppStats = appStats || { registeredSpaces: '0', successfulMatches: '0' };

  // 검색어와 카테고리에 따라 공간 필터링
  useEffect(() => {
    let filtered = [...savedSpaces]; // recommendedSpaces 대신 savedSpaces 사용
    let filteredAds = [...safeAdSpaces];

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      const categoryTagMap: Record<string, string[]> = {
        사무실: ['사무실', '오피스', '워크스페이스', '비즈니스'],
        창고: ['창고', '물류', '보관'],
        상가: ['상가', '매장', '가게', '숍'],
        스튜디오: ['스튜디오', '촬영', '녹음'],
        주차장: ['주차', '주차장'],
        공방: ['공방', '작업실', '공예', '도예', '목공예', '가죽공예', '유리공예'],
      };

      const matchingTags = categoryTagMap[selectedCategory] || [selectedCategory.toLowerCase()];

      // 일반 공간 필터링
      filtered = filtered.filter((space) => {
        const titleMatch = space.title.toLowerCase().includes(selectedCategory.toLowerCase());
        const tagMatch = space.tags.some((tag) => matchingTags.some((matchTag) => tag.toLowerCase().includes(matchTag.toLowerCase())));
        return titleMatch || tagMatch;
      });

      // 광고 공간 필터링
      filteredAds = filteredAds.filter((space) => {
        const titleMatch = space.title.toLowerCase().includes(selectedCategory.toLowerCase());
        const tagMatch = space.tags.some((tag) => matchingTags.some((matchTag) => tag.toLowerCase().includes(matchTag.toLowerCase())));
        return titleMatch || tagMatch;
      });
    }

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      // 일반 공간 검색
      filtered = filtered.filter((space) => space.title.toLowerCase().includes(query) || space.location.toLowerCase().includes(query) || space.tags.some((tag) => tag.toLowerCase().includes(query)));

      // 광고 공간 검색
      filteredAds = filteredAds.filter((space) => space.title.toLowerCase().includes(query) || space.location.toLowerCase().includes(query) || space.tags.some((tag) => tag.toLowerCase().includes(query)));
    }

    setFilteredSpaces(filtered);
    setFilteredAdSpaces(filteredAds);
    setIsSearchActive(searchQuery.trim() !== '' || selectedCategory !== '전체');
  }, [searchQuery, selectedCategory, savedSpaces, safeAdSpaces]); // 의존성 배열도 수정

  // 검색 관련 핸들러들
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('전체');
    setIsSearchActive(false);
  };

  const handleFilterClick = () => {
    console.log('Filter button clicked');
  };

  // 공간 카드 이벤트 핸들러들
  const handleSpaceClick = (space: Space | AdSpace) => {
    console.log('Space clicked:', space.title);
  };

  const handleFavoriteClick = (space: Space | AdSpace) => {
    console.log('Favorite clicked:', space.title);
  };

  const handleAdClick = (adSpace: AdSpace) => {
    console.log('Ad clicked:', adSpace.title, 'Type:', adSpace.adType);
    // 광고 클릭 추적 로직
  };

  const handleRecentSpaceClick = (space: RecentSpace) => {
    console.log('Recent space clicked:', space.name);
  };

  const handlePopularSpaceClick = (space: PopularSpace) => {
    console.log('Popular space clicked:', space.name);
  };

  // 빈 상태 컴포넌트
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
      <AlertCircle className="h-12 w-12 mb-2 opacity-50" />
      <p className="text-sm text-center">{message}</p>
    </div>
  );

  // 검색 결과 통합 (광고 + 일반 공간)
  const totalSearchResults = filteredAdSpaces.length + filteredSpaces.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col mx-auto" style={{ minWidth: 'var(--sizes-min-width)', maxWidth: 'var(--sizes-max-width)' }}>
      {/* 헤더 */}
      <MobileHeader />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto">
        {/* 검색 및 필터링 컴포넌트 */}
        <SearchAndFilter searchQuery={searchQuery} selectedCategory={selectedCategory} categories={safeCategories} resultCount={isSearchActive ? totalSearchResults : undefined} isSearchActive={isSearchActive} placeholder="원하는 공간을 검색해보세요" onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} onClearSearch={handleClearSearch} onFilterClick={handleFilterClick} />

        {/* 통계 및 현황 카드 - 검색 중이 아닐 때만 표시 */}
        {!isSearchActive && (
          <div style={{ padding: '8px var(--sizes-layout-padding)' }}>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-xs font-medium">등록 공간</p>
                      <p className="text-2xl font-bold">{safeAppStats.registeredSpaces}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-xs font-medium">성공 매칭</p>
                      <p className="text-2xl font-bold">{safeAppStats.successfulMatches}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 추천 공간 또는 검색 결과 */}
        <div style={{ padding: '8px var(--sizes-layout-padding)' }}>
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{isSearchActive ? '검색 결과' : '추천 공간'}</CardTitle>
                {!isSearchActive && (
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    더보기
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
              <CardDescription>{isSearchActive ? '검색 조건에 맞는 공간들입니다' : '당신에게 맞는 완벽한 공간을 찾아보세요'}</CardDescription>
            </CardHeader>
            <CardContent>
              {isSearchActive ? (
                // 검색 결과 표시 (광고 + 일반 공간)
                totalSearchResults > 0 ? (
                  <div className="space-y-3">
                    {/* 광고 공간 먼저 표시 */}
                    {filteredAdSpaces.map((adSpace) => (
                      <SpaceItem key={`ad-${adSpace.id}`} adSpace={adSpace} onSpaceClick={handleSpaceClick} onFavoriteClick={handleFavoriteClick} onAdClick={handleAdClick} />
                    ))}
                    {/* 일반 공간 표시 */}
                    {filteredSpaces.map((space) => (
                      <SpaceItem key={space.id} space={space} onSpaceClick={handleSpaceClick} onFavoriteClick={handleFavoriteClick} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message="검색 결과가 없습니다. 다른 키워드로 검색해보세요." />
                )
              ) : // 기본 추천 공간 표시
              safeRecommendedSpaces.length > 0 ? (
                <div className="space-y-3">
                  {/* 프리미엄 광고 2개 먼저 표시 */}
                  {safeAdSpaces
                    .filter((ad) => ad.adType === 'premium')
                    .slice(0, 2)
                    .map((adSpace) => (
                      <SpaceItem key={`ad-${adSpace.id}`} adSpace={adSpace} onSpaceClick={handleSpaceClick} onFavoriteClick={handleFavoriteClick} onAdClick={handleAdClick} />
                    ))}

                  {/* 추천 공간 3개 표시 */}
                  {safeRecommendedSpaces.slice(0, 3).map((space) => (
                    <SpaceItem key={space.id} space={space} onSpaceClick={handleSpaceClick} onFavoriteClick={handleFavoriteClick} />
                  ))}
                </div>
              ) : (
                <EmptyState message="추천 공간을 불러올 수 없습니다." />
              )}
            </CardContent>
            {isSearchActive && totalSearchResults > 6 && (
              <CardFooter>
                <Button variant="outline" className="w-full">
                  더 많은 결과 보기 ({totalSearchResults - 6}개 더)
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* 최근 본 공간 - 검색 중이 아닐 때만 표시 */}
        {!isSearchActive && (
          <div style={{ padding: '8px var(--sizes-layout-padding)' }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">최근 본 공간</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    전체보기
                  </Button>
                </div>
                <CardDescription>최근에 확인한 공간들을 다시 살펴보세요</CardDescription>
              </CardHeader>
              <CardContent>
                {safeRecentSpaces.length > 0 ? (
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {safeRecentSpaces.map((space) => (
                      <RecentSpaceCard key={space.id} space={space} onClick={handleRecentSpaceClick} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message="최근 본 공간이 없습니다." />
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 이번 주 인기 공간 - 검색 중이 아닐 때만 표시 */}
        {!isSearchActive && (
          <div style={{ padding: '8px var(--sizes-layout-padding)', marginTop: '16px' }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                  이번 주 인기 공간
                </CardTitle>
                <CardDescription>가장 많은 관심을 받고 있는 공간들</CardDescription>
              </CardHeader>
              <CardContent>
                {safePopularSpaces.length > 0 ? (
                  <div className="space-y-3">
                    {safePopularSpaces.map((space) => (
                      <PopularSpaceItem key={space.rank} space={space} onClick={handlePopularSpaceClick} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message="인기 공간 데이터를 불러올 수 없습니다." />
                )}
              </CardContent>
              <CardFooter className="pt-3">
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  전체 랭킹 보기
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* 푸터 컴포넌트 */}
        <Footer />
      </main>

      {/* 하단 네비게이션 바 */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

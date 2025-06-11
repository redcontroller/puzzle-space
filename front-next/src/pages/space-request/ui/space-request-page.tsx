'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Input } from '@/shared/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import { SpaceRequestForm } from '@/features/space-request/ui/space-request-form';
import { SpaceRequestCard } from '@/entities/space-request/ui/space-request-card';
import { MessageSquarePlus, Plus, Search, Clock, CheckCircle, TrendingUp, SlidersHorizontal } from 'lucide-react';
import type { SpaceRequestFormData, SpaceRequest } from '@/shared/types/space-request';
import { spaceRequests, mySpaceRequests } from '@/shared/mock-data/space-requests';

export function SpaceRequestPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);

  // 필터링된 요청 목록
  const filteredRequests = spaceRequests.filter((request) => {
    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = request.title.toLowerCase().includes(query);
      const matchesContent = request.content.toLowerCase().includes(query);
      const matchesLocation = request.location.region.toLowerCase().includes(query) || (request.location.district && request.location.district.toLowerCase().includes(query));

      if (!(matchesTitle || matchesContent || matchesLocation)) {
        return false;
      }
    }

    // 탭 필터링
    if (activeTab === 'my' && !request.isMyRequest) {
      return false;
    }

    // 공간 유형 필터링
    if (selectedType && request.spaceType !== selectedType) {
      return false;
    }

    // 긴급도 필터링
    if (selectedUrgency && request.urgency !== selectedUrgency) {
      return false;
    }

    return true;
  });

  const handleFormSubmit = (formData: SpaceRequestFormData) => {
    // 실제 구현에서는 API 호출로 데이터 저장
    console.log('Form submitted:', formData);
    setShowForm(false);

    // 성공 알림 (실제 앱에서는 toast 등 사용)
    alert('공간 요청이 성공적으로 제출되었습니다!');
  };

  const handleRequestClick = (request: SpaceRequest) => {
    console.log('Request clicked:', request);
    // 상세 페이지로 이동 또는 모달 표시 등의 로직
  };

  const spaceTypes = [
    { id: 'office', label: '사무실' },
    { id: 'warehouse', label: '창고' },
    { id: 'retail', label: '상가' },
    { id: 'studio', label: '스튜디오' },
    { id: 'parking', label: '주차장' },
    { id: 'workshop', label: '공방' },
  ];

  const urgencyOptions = [
    { id: 'high', label: '급함', icon: Clock },
    { id: 'medium', label: '보통', icon: TrendingUp },
    { id: 'low', label: '여유', icon: CheckCircle },
  ];

  // 통계 데이터
  const stats = {
    total: spaceRequests.length,
    pending: spaceRequests.filter((r) => r.status === 'pending').length,
    processing: spaceRequests.filter((r) => r.status === 'processing').length,
    matched: spaceRequests.filter((r) => r.status === 'matched').length,
    myRequests: mySpaceRequests.length,
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 pb-20">
        <SpaceRequestForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* 헤더 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageSquarePlus className="h-6 w-6 text-blue-600" />
              공간 요청
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">원하는 공간을 요청하고 맞춤 매칭을 받아보세요</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />새 요청
          </Button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="p-4 space-y-4">
        {/* 통계 카드 */}
        <div className="grid grid-cols-5 gap-2">
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.total}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">전체</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">대기중</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-lg font-bold text-blue-600">{stats.processing}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">처리중</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-lg font-bold text-green-600">{stats.matched}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">매칭완료</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-lg font-bold text-purple-600">{stats.myRequests}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">내 요청</div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input type="text" placeholder="검색어를 입력하세요" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* 필터 옵션 */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">공간 유형</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant={selectedType === null ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedType(null)}>
                전체
              </Badge>
              {spaceTypes.map((type) => (
                <Badge key={type.id} variant={selectedType === type.id ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedType(type.id)}>
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">긴급도</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant={selectedUrgency === null ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedUrgency(null)}>
                전체
              </Badge>
              {urgencyOptions.map((option) => (
                <Badge key={option.id} variant={selectedUrgency === option.id ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedUrgency(option.id)}>
                  <option.icon className="h-3 w-3 mr-1" />
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 탭 및 요청 목록 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="all">전체 요청 ({spaceRequests.length})</TabsTrigger>
            <TabsTrigger value="my">내 요청 ({mySpaceRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {filteredRequests.length > 0 ? (
              <div className="space-y-3">
                {filteredRequests.map((request) => (
                  <SpaceRequestCard key={request.id} request={request} onClick={handleRequestClick} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquarePlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{searchQuery || selectedType || selectedUrgency ? '검색 결과가 없습니다' : '아직 요청이 없습니다'}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{searchQuery || selectedType || selectedUrgency ? '다른 조건으로 검색해보세요' : '첫 번째 공간 요청을 작성해보세요'}</p>
                {!(searchQuery || selectedType || selectedUrgency) && (
                  <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
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
                  .filter((request) => {
                    // 내 요청에도 검색 및 필터 적용
                    if (searchQuery) {
                      const query = searchQuery.toLowerCase();
                      const matchesTitle = request.title.toLowerCase().includes(query);
                      const matchesContent = request.content.toLowerCase().includes(query);
                      const matchesLocation = request.location.region.toLowerCase().includes(query) || (request.location.district && request.location.district.toLowerCase().includes(query));

                      if (!(matchesTitle || matchesContent || matchesLocation)) {
                        return false;
                      }
                    }

                    if (selectedType && request.spaceType !== selectedType) {
                      return false;
                    }

                    if (selectedUrgency && request.urgency !== selectedUrgency) {
                      return false;
                    }

                    return true;
                  })
                  .map((request) => (
                    <SpaceRequestCard key={request.id} request={request} onClick={handleRequestClick} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquarePlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">내 요청이 없습니다</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">원하는 공간을 요청해보세요</p>
                <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />새 요청 작성
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

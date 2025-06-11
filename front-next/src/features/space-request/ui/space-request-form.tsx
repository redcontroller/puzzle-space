'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { MapPin, DollarSign, Calendar, Target, Home, Building2, Warehouse, Camera, Car, Palette, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import type { SpaceRequestFormData } from '@/shared/types/space-request';

interface SpaceRequestFormProps {
  onSubmit: (data: SpaceRequestFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<SpaceRequestFormData>;
}

export function SpaceRequestForm({ onSubmit, onCancel, initialData }: SpaceRequestFormProps) {
  const [formData, setFormData] = useState<SpaceRequestFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    spaceType: initialData?.spaceType || '',
    region: initialData?.region || '',
    district: initialData?.district || '',
    detailAddress: initialData?.detailAddress || '',
    budgetMin: initialData?.budgetMin || '',
    budgetMax: initialData?.budgetMax || '',
    budgetPeriod: initialData?.budgetPeriod || 'daily',
    purpose: initialData?.purpose || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    isFlexible: initialData?.isFlexible || false,
    areaMin: initialData?.areaMin || '',
    areaMax: initialData?.areaMax || '',
    areaUnit: initialData?.areaUnit || '평',
    floor: initialData?.floor || '',
    facilities: initialData?.facilities || [],
    additionalRequirements: initialData?.additionalRequirements || '',
    contactName: initialData?.contactName || '',
    contactPhone: initialData?.contactPhone || '',
    contactEmail: initialData?.contactEmail || '',
    preferredContact: initialData?.preferredContact || 'both',
    urgency: initialData?.urgency || 'medium',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const spaceTypes = [
    { id: 'office', label: '사무실', icon: Building2, description: '업무용 공간' },
    { id: 'warehouse', label: '창고', icon: Warehouse, description: '보관 및 물류' },
    { id: 'retail', label: '상가', icon: Home, description: '판매 및 서비스' },
    { id: 'studio', label: '스튜디오', icon: Camera, description: '촬영 및 제작' },
    { id: 'parking', label: '주차장', icon: Car, description: '차량 보관' },
    { id: 'workshop', label: '공방', icon: Palette, description: '제작 및 작업' },
  ];

  const regions = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주특별자치도'];

  const facilityOptions = ['전기 사용', '화장실', '인터넷', '냉난방', '환기 시설', '주차 공간', '24시간 출입', '보안 시설', '엘리베이터', '급수 시설', '소방 시설', '적재 시설', '방음 시설', '조명 시설', '하역장'];

  const handleInputChange = (field: keyof SpaceRequestFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData((prev) => {
      const facilities = [...prev.facilities];
      const index = facilities.indexOf(facility);

      if (index === -1) {
        facilities.push(facility);
      } else {
        facilities.splice(index, 1);
      }

      return { ...prev, facilities };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return '기본 정보 입력';
      case 2:
        return '위치 및 예산';
      case 3:
        return '사용 목적 및 기간';
      case 4:
        return '상세 요구사항';
      case 5:
        return '연락처 정보';
      default:
        return '';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 진행 상황 표시 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {currentStep} / {totalSteps} 단계
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((currentStep / totalSteps) * 100)}% 완료</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            {getStepTitle()}
          </CardTitle>
          <CardDescription>원하는 공간을 찾기 위한 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1: 기본 정보 입력 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">제목</label>
                  <input type="text" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="어떤 공간을 찾고 계신가요? (예: 공구를 보관할 장소가 필요합니다)" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">상세 내용</label>
                  <textarea value={formData.content} onChange={(e) => handleInputChange('content', e.target.value)} placeholder="필요한 공간에 대해 자세히 설명해주세요" rows={4} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">어떤 공간을 찾고 계신가요?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {spaceTypes.map((type) => (
                      <button key={type.id} type="button" onClick={() => handleInputChange('spaceType', type.id)} className={`p-4 rounded-lg border-2 transition-all text-left ${formData.spaceType === type.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <type.icon className={`h-5 w-5 ${formData.spaceType === type.id ? 'text-blue-600' : 'text-gray-500'}`} />
                          <span className="font-medium">{type.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: 위치 및 예산 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    희망 지역
                  </label>
                  <select value={formData.region} onChange={(e) => handleInputChange('region', e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required>
                    <option value="">지역을 선택해주세요</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">상세 지역 (선택사항)</label>
                  <input type="text" value={formData.district} onChange={(e) => handleInputChange('district', e.target.value)} placeholder="예: 강남구, 서초구" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    예산 범위
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input type="number" value={formData.budgetMin} onChange={(e) => handleInputChange('budgetMin', e.target.value)} placeholder="최소 금액" className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                    <input type="number" value={formData.budgetMax} onChange={(e) => handleInputChange('budgetMax', e.target.value)} placeholder="최대 금액" className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                  </div>
                  <select value={formData.budgetPeriod} onChange={(e) => handleInputChange('budgetPeriod', e.target.value as 'daily' | 'monthly' | 'yearly')} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                    <option value="daily">일</option>
                    <option value="monthly">월</option>
                    <option value="yearly">년</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: 사용 목적 및 기간 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">사용 목적</label>
                  <textarea value={formData.purpose} onChange={(e) => handleInputChange('purpose', e.target.value)} placeholder="공간을 어떤 용도로 사용하실 예정인지 자세히 알려주세요" rows={3} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    사용 기간
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input type="date" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                    <input type="date" value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                  </div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={formData.isFlexible} onChange={(e) => handleInputChange('isFlexible', e.target.checked)} className="rounded" />
                    <span className="text-sm">날짜 조정 가능</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: 상세 요구사항 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">희망 면적</label>
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <input type="number" value={formData.areaMin} onChange={(e) => handleInputChange('areaMin', e.target.value)} placeholder="최소 면적" className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
                    <input type="number" value={formData.areaMax} onChange={(e) => handleInputChange('areaMax', e.target.value)} placeholder="최대 면적" className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
                  </div>
                  <select value={formData.areaUnit} onChange={(e) => handleInputChange('areaUnit', e.target.value as '평' | 'm²')} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                    <option value="평">평</option>
                    <option value="m²">m²</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">필요한 시설</label>
                  <div className="grid grid-cols-2 gap-3">
                    {facilityOptions.map((facility) => (
                      <label key={facility} className="flex items-center gap-2">
                        <input type="checkbox" checked={formData.facilities.includes(facility)} onChange={() => handleFacilityToggle(facility)} className="rounded" />
                        <span className="text-sm">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">추가 요구사항</label>
                  <textarea value={formData.additionalRequirements} onChange={(e) => handleInputChange('additionalRequirements', e.target.value)} placeholder="기타 특별한 요구사항이 있다면 자세히 적어주세요" rows={3} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
                </div>
              </div>
            )}

            {/* Step 5: 연락처 정보 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">이름</label>
                    <input type="text" value={formData.contactName} onChange={(e) => handleInputChange('contactName', e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">전화번호</label>
                    <input type="tel" value={formData.contactPhone} onChange={(e) => handleInputChange('contactPhone', e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">이메일</label>
                    <input type="email" value={formData.contactEmail} onChange={(e) => handleInputChange('contactEmail', e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">선호하는 연락 방법</label>
                  <select value={formData.preferredContact} onChange={(e) => handleInputChange('preferredContact', e.target.value as 'phone' | 'email' | 'both')} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                    <option value="both">전화 + 이메일</option>
                    <option value="phone">전화</option>
                    <option value="email">이메일</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    긴급도
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'low', label: '여유있음', icon: CheckCircle },
                      { value: 'medium', label: '보통', icon: AlertCircle },
                      { value: 'high', label: '급함', icon: Clock },
                    ].map((urgency) => (
                      <button key={urgency.value} type="button" onClick={() => handleInputChange('urgency', urgency.value)} className={`p-3 rounded-lg border-2 transition-all ${formData.urgency === urgency.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                        <urgency.icon className={`h-5 w-5 mx-auto mb-1 ${formData.urgency === urgency.value ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className="text-sm font-medium">{urgency.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={currentStep === 1 ? onCancel : prevStep} className="px-6">
                {currentStep === 1 ? '취소' : '이전'}
              </Button>

              {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep} disabled={(currentStep === 1 && (!formData.title || !formData.spaceType)) || (currentStep === 2 && (!formData.region || !formData.budgetMin || !formData.budgetMax)) || (currentStep === 3 && (!formData.purpose || !formData.startDate || !formData.endDate))} className="px-6">
                  다음
                </Button>
              ) : (
                <Button type="submit" className="px-6 bg-blue-600 hover:bg-blue-700">
                  요청 제출
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

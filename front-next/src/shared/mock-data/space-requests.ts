import type { SpaceRequest } from '../types/space-request'

// 사용자 프로필 이미지 배열
const profileImages = [
  '/placeholder.svg?height=40&width=40',
  '/placeholder.svg?height=40&width=40',
  '/placeholder.svg?height=40&width=40',
  '/placeholder.svg?height=40&width=40',
  '/placeholder.svg?height=40&width=40',
]

// 시설 옵션 배열
const facilityOptions = [
  '전기 사용',
  '화장실',
  '인터넷',
  '냉난방',
  '환기 시설',
  '주차 공간',
  '24시간 출입',
  '보안 시설',
  '엘리베이터',
  '급수 시설',
  '소방 시설',
  '적재 시설',
  '방음 시설',
  '조명 시설',
  '하역장',
]

// 지역 배열
const regions = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
]

// 서울 지역구 배열
const seoulDistricts = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
]

// 공간 유형 배열
const spaceTypes = [
  'office',
  'warehouse',
  'retail',
  'studio',
  'parking',
  'workshop',
]

// 공간 유형 한글 매핑
const spaceTypeLabels: Record<string, string> = {
  office: '사무실',
  warehouse: '창고',
  retail: '상가',
  studio: '스튜디오',
  parking: '주차장',
  workshop: '공방',
}

// 요청 제목 배열
const requestTitles = [
  '공구를 보관할 장소가 필요합니다',
  '이삿짐 보관용 창고 급구합니다',
  '석공사 재고 가재 파렛트 단위 보관 장소 찾습니다',
  '악기 연주해도 괜찮은 곳을 찾고 있어요',
  '소규모 스타트업 사무실 구합니다',
  '주말에만 사용할 작업실 필요합니다',
  '단기간 팝업 스토어 운영 장소 구해요',
  '조용한 녹음실 또는 스튜디오 찾습니다',
  '소형 창고 단기 임대 원합니다',
  '사진 촬영용 스튜디오 필요해요',
  '소규모 요가 클래스 운영 공간 구합니다',
  '온라인 쇼핑몰 물류창고 필요합니다',
  '미술 작업실 공유 가능한 곳 찾아요',
  '주차 공간 월 단위 임대 원합니다',
  '소규모 베이커리 창업 장소 구해요',
  '영상 편집용 조용한 사무실 필요합니다',
  '가구 제작 가능한 작업 공간 찾습니다',
  '단기 전시회 장소 구합니다',
  '소규모 세미나 진행 공간 필요해요',
  '자동차 수리 가능한 공간 찾습니다',
  '도자기 작업 가능한 공방 구해요',
  '의류 보관용 창고 필요합니다',
  '소규모 공연 연습 공간 구합니다',
  '제품 사진 촬영 스튜디오 찾아요',
  '3D 프린팅 작업실 공유 원합니다',
  '소규모 요리 클래스 운영 장소 필요해요',
  '가죽 공예 작업 가능한 공간 구합니다',
  '단기 팝업 레스토랑 운영 장소 찾아요',
  '소규모 코딩 교육 장소 필요합니다',
  '목공 작업 가능한 공간 구해요',
]

// 요청 내용 생성 함수
const generateRequestContent = (title: string, spaceType: string): string => {
  const spaceTypeLabel = spaceTypeLabels[spaceType]

  const contentTemplates = [
    `안녕하세요, ${title.replace(/[?.!,]$/, '')}. 적절한 ${spaceTypeLabel}을 찾고 있습니다. 조건에 맞는 공간을 알고 계시다면 연락 부탁드립니다.`,
    `${title.replace(/[?.!,]$/, '')}. 예산 범위 내에서 조건에 맞는 ${spaceTypeLabel}을 구하고 있습니다. 제안 기다리겠습니다.`,
    `${spaceTypeLabel} 구합니다. ${title.replace(/[?.!,]$/, '')}. 조건에 맞는 공간 있으시면 연락주세요.`,
    `${title.replace(/[?.!,]$/, '')}. 위치와 가격이 맞는다면 장기 계약도 고려하고 있습니다. 좋은 제안 부탁드립니다.`,
  ]

  return contentTemplates[Math.floor(Math.random() * contentTemplates.length)]
}

// 랜덤 날짜 생성 함수 (최근 30일 이내)
const generateRandomDate = (): string => {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 30)
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

// 랜덤 시설 선택 함수
const getRandomFacilities = (): string[] => {
  const count = Math.floor(Math.random() * 5) + 1 // 1~5개 선택
  const shuffled = [...facilityOptions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// 랜덤 면적 생성 함수
const generateRandomArea = (): {
  min: number
  max: number
  unit: '평' | 'm²'
} => {
  const min = Math.floor(Math.random() * 20) + 3 // 3~22평
  const max = min + Math.floor(Math.random() * 10) + 5 // min + 5~14평
  return {
    min,
    max,
    unit: '평',
  }
}

// 샘플 데이터 생성
export const spaceRequests: SpaceRequest[] = requestTitles.map(
  (title, index) => {
    const id = (index + 1).toString()
    const spaceType = spaceTypes[Math.floor(Math.random() * spaceTypes.length)]
    const region = regions[Math.floor(Math.random() * regions.length)]
    const district =
      region === '서울특별시'
        ? seoulDistricts[Math.floor(Math.random() * seoulDistricts.length)]
        : undefined

    const createdAt = generateRandomDate()
    const area = generateRandomArea()
    const facilities = getRandomFacilities()

    const budgetMin = Math.floor(Math.random() * 50 + 10) * 10000 // 10만원 ~ 59만원
    const budgetMax = budgetMin + Math.floor(Math.random() * 50 + 10) * 10000 // budgetMin + 10만원 ~ 59만원

    const views = Math.floor(Math.random() * 100) + 5 // 5~104 조회수
    const proposals = Math.floor(Math.random() * 5) // 0~4 제안수

    const urgencyOptions: ('low' | 'medium' | 'high')[] = [
      'low',
      'medium',
      'high',
    ]
    const urgency =
      urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)]

    const statusOptions: (
      | 'pending'
      | 'processing'
      | 'matched'
      | 'completed'
      | 'cancelled'
    )[] = ['pending', 'processing', 'matched', 'completed', 'cancelled']
    const status =
      statusOptions[Math.floor(Math.random() * statusOptions.length)]

    // 시작일은 오늘부터 30일 이내, 종료일은 시작일로부터 30~90일 이내
    const today = new Date()
    const startDateObj = new Date(
      today.getTime() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    )
    const endDateObj = new Date(
      startDateObj.getTime() +
        (Math.floor(Math.random() * 60) + 30) * 24 * 60 * 60 * 1000
    )

    const startDate = startDateObj.toISOString().split('T')[0]
    const endDate = endDateObj.toISOString().split('T')[0]

    return {
      id,
      title,
      content: generateRequestContent(title, spaceType),
      author: {
        id: `user${Math.floor(Math.random() * 100) + 1}`,
        name: `사용자${Math.floor(Math.random() * 100) + 1}`,
        profileImage:
          profileImages[Math.floor(Math.random() * profileImages.length)],
      },
      spaceType,
      location: {
        region,
        district,
      },
      budget: {
        min: budgetMin,
        max: budgetMax,
        period: ['daily', 'monthly', 'yearly'][
          Math.floor(Math.random() * 3)
        ] as 'daily' | 'monthly' | 'yearly',
      },
      purpose: title,
      duration: {
        startDate,
        endDate,
        isFlexible: Math.random() > 0.5,
      },
      requirements: {
        area,
        facilities,
      },
      additionalRequirements:
        Math.random() > 0.7 ? '특별한 요구사항은 없습니다.' : undefined,
      contact: {
        name: `사용자${Math.floor(Math.random() * 100) + 1}`,
        phone: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        email: `user${Math.floor(Math.random() * 100) + 1}@example.com`,
        preferredContact: ['phone', 'email', 'both'][
          Math.floor(Math.random() * 3)
        ] as 'phone' | 'email' | 'both',
      },
      urgency,
      status,
      createdAt,
      views,
      proposals,
      isMyRequest: index < 3, // 처음 3개는 내 요청으로 설정
    }
  }
)

// 내 요청만 필터링
export const mySpaceRequests = spaceRequests.filter(
  request => request.isMyRequest
)

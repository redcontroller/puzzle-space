import type { SpaceDetail } from '@/shared/types/space-detail'
import { savedSpaces, adSpaces } from './spaces'

// 공간 상세 정보 생성 함수 (일반 공간 + 광고 공간 모두 지원)
export function getSpaceDetail(id: number): SpaceDetail | null {
  // 먼저 광고 공간에서 찾기
  const adSpace = adSpaces.find(s => s.id === id)
  if (adSpace) {
    return {
      id: adSpace.id,
      title: adSpace.title,
      location: adSpace.location,
      price: adSpace.price,
      rating: adSpace.rating,
      imageType: adSpace.imageType,
      tags: adSpace.tags,
      isFavorite: adSpace.isFavorite,
      floor: adSpace.floor,
      area: adSpace.area,
      isAd: true,
      adType: adSpace.adType,
      adBadge: adSpace.adBadge,
      promotionText: adSpace.promotionText,
      originalPrice: adSpace.originalPrice,
      description: getAdSpaceDescription(adSpace),
      introduction: getAdSpaceIntroduction(adSpace),
      facilities: [...adSpace.tags, ...getAdSpaceFacilities(adSpace.adType)],
      usagePeriod: getAdSpaceUsagePeriod(adSpace.adType),
      accessHours: getAdSpaceAccessHours(adSpace.adType),
      coordinates: {
        lat: 37.5665 + ((adSpace.id % 10) - 5) * 0.01,
        lng: 126.978 + ((adSpace.id % 10) - 5) * 0.01,
      },
      detailAddress: `${adSpace.location} 상세주소 ${
        (adSpace.id % 100) + 1
      }번지`,
      images: [
        `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
          adSpace.title + ' 프리미엄 이미지 1'
        )}`,
        `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
          adSpace.title + ' 프리미엄 이미지 2'
        )}`,
        `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
          adSpace.title + ' 프리미엄 이미지 3'
        )}`,
        `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
          adSpace.title + ' 프리미엄 이미지 4'
        )}`,
      ],
    }
  }

  // 일반 공간에서 찾기
  const space = savedSpaces.find(s => s.id === id)
  if (!space) {
    return null
  }

  // 기본 공간 정보를 바탕으로 상세 정보 생성
  return {
    id: space.id,
    title: space.title,
    location: space.location,
    price: space.price,
    rating: space.rating,
    imageType: space.imageType,
    tags: space.tags,
    isFavorite: space.isFavorite,
    floor: space.floor,
    area: space.area,
    isAd: false,
    description: `${space.title}은(는) ${space.location}에 위치한 프리미엄 공간입니다. 최신 시설과 편의 시설을 갖추고 있어 업무나 창작 활동에 최적화되어 있습니다.`,
    introduction: `이 공간은 ${space.tags.join(
      ', '
    )} 등의 시설을 제공하며, 편리한 접근성과 쾌적한 환경을 자랑합니다. 다양한 용도로 활용 가능하며, 전문적인 업무부터 창의적인 작업까지 모든 니즈를 만족시킬 수 있습니다.`,
    facilities: space.tags,
    usagePeriod: {
      minDays: 1,
      maxDays: 30,
    },
    accessHours: {
      weekdays: '09:00 - 18:00',
      weekends: '10:00 - 16:00',
      holidays: '휴무',
    },
    coordinates: {
      lat: 37.5665 + ((space.id % 10) - 5) * 0.01,
      lng: 126.978 + ((space.id % 10) - 5) * 0.01,
    },
    detailAddress: `${space.location} 상세주소 ${(space.id % 100) + 1}번지`,
    images: [
      `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
        space.title + ' 이미지 1'
      )}`,
      `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
        space.title + ' 이미지 2'
      )}`,
      `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
        space.title + ' 이미지 3'
      )}`,
    ],
  }
}

// 광고 공간 타입별 설명 생성
function getAdSpaceDescription(adSpace: any): string {
  const baseDescription = `${adSpace.title}은(는) ${adSpace.location}에 위치한 프리미엄 공간입니다.`

  switch (adSpace.adType) {
    case 'premium':
      return `${baseDescription} 최고급 시설과 서비스를 제공하는 프리미엄 공간으로, 중요한 비즈니스나 특별한 행사에 완벽한 환경을 제공합니다.`
    case 'featured':
      return `${baseDescription} 엄선된 특별 공간으로, 최신 기술과 혁신적인 시설을 갖추고 있어 차별화된 경험을 제공합니다.`
    case 'sponsored':
      return `${baseDescription} 특별 혜택과 함께 제공되는 추천 공간으로, 합리적인 가격에 우수한 품질을 경험할 수 있습니다.`
    default:
      return baseDescription
  }
}

// 광고 공간 타입별 소개 생성
function getAdSpaceIntroduction(adSpace: any): string {
  switch (adSpace.adType) {
    case 'premium':
      return `이 프리미엄 공간은 최상급 서비스와 시설을 자랑합니다. 전용 컨시어지 서비스, 고급 인테리어, 최첨단 장비를 통해 최고의 경험을 제공합니다. ${
        adSpace.promotionText || ''
      }`
    case 'featured':
      return `특별히 선별된 이 공간은 혁신적인 기술과 모던한 디자인이 조화를 이룹니다. 창의적인 작업과 효율적인 업무를 위한 최적의 환경을 제공합니다. ${
        adSpace.promotionText || ''
      }`
    case 'sponsored':
      return `추천 공간으로 선정된 이곳은 뛰어난 가성비와 품질을 자랑합니다. 합리적인 가격에 우수한 시설과 서비스를 이용할 수 있습니다. ${
        adSpace.promotionText || ''
      }`
    default:
      return `${adSpace.tags.join(
        ', '
      )} 등의 시설을 제공하며, 편리한 접근성과 쾌적한 환경을 자랑합니다.`
  }
}

// 광고 공간 타입별 추가 시설
function getAdSpaceFacilities(adType: string): string[] {
  switch (adType) {
    case 'premium':
      return [
        '컨시어지 서비스',
        'VIP 라운지',
        '프리미엄 케이터링',
        '전용 주차',
        '24시간 보안',
      ]
    case 'featured':
      return [
        '최신 기술',
        '스마트 시설',
        '고속 인터넷',
        '화상회의 시설',
        '무선 충전',
      ]
    case 'sponsored':
      return [
        '특별 할인',
        '추가 서비스',
        '연장 이용',
        '무료 시설',
        '멤버십 혜택',
      ]
    default:
      return []
  }
}

// 광고 공간 타입별 사용 기간
function getAdSpaceUsagePeriod(adType: string): {
  minDays: number
  maxDays: number
} {
  switch (adType) {
    case 'premium':
      return { minDays: 1, maxDays: 365 }
    case 'featured':
      return { minDays: 1, maxDays: 180 }
    case 'sponsored':
      return { minDays: 1, maxDays: 90 }
    default:
      return { minDays: 1, maxDays: 30 }
  }
}

// 광고 공간 타입별 출입 시간
function getAdSpaceAccessHours(adType: string): {
  weekdays: string
  weekends: string
  holidays: string
} {
  switch (adType) {
    case 'premium':
      return {
        weekdays: '24시간',
        weekends: '24시간',
        holidays: '24시간',
      }
    case 'featured':
      return {
        weekdays: '06:00 - 24:00',
        weekends: '08:00 - 22:00',
        holidays: '08:00 - 22:00',
      }
    case 'sponsored':
      return {
        weekdays: '08:00 - 20:00',
        weekends: '09:00 - 18:00',
        holidays: '10:00 - 16:00',
      }
    default:
      return {
        weekdays: '09:00 - 18:00',
        weekends: '10:00 - 16:00',
        holidays: '휴무',
      }
  }
}

// 특정 공간들에 대한 더 상세한 정보
export const detailedSpaceInfo: Record<number, Partial<SpaceDetail>> = {
  1001: {
    description:
      '강남 중심가에 위치한 최고급 비즈니스센터입니다. 현대적인 디자인과 최첨단 시설을 갖추고 있어 중요한 비즈니스 미팅이나 프레젠테이션에 완벽한 공간입니다.',
    introduction:
      '이 프리미엄 비즈니스센터는 강남역에서 도보 3분 거리에 위치하여 접근성이 뛰어나며, 전용 컨시어지 서비스와 함께 최상급의 비즈니스 환경을 제공합니다. 🎯 오픈 기념 첫 달 50% 할인 혜택을 놓치지 마세요!',
    usagePeriod: { minDays: 1, maxDays: 365 },
    accessHours: {
      weekdays: '24시간',
      weekends: '24시간',
      holidays: '24시간',
    },
  },
  1002: {
    description:
      '판교 테크밸리의 혁신적인 스마트오피스입니다. AI 기반 시설 관리와 최첨단 기술이 결합된 미래형 업무 공간입니다.',
    introduction:
      '이 스마트오피스는 AI 기반 환경 제어, 음성 인식 시설 관리, 스마트 보안 시스템 등 최신 기술을 도입하여 효율적이고 편리한 업무 환경을 제공합니다. 🌟 AI 기반 스마트 시설이 완비되어 있습니다.',
  },
  1003: {
    description:
      '인천 스마트 물류 창고는 자동화 시스템과 IoT 기술이 적용된 차세대 물류 공간입니다.',
    introduction:
      '완전 자동화된 물류 시스템과 실시간 재고 관리, 스마트 보안 시스템을 갖춘 최첨단 물류 창고입니다. ✨ 최첨단 자동화 시스템이 완비되어 있어 효율적인 물류 관리가 가능합니다.',
  },
}

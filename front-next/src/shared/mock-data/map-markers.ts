import type { MapMarker } from '../types/map'

export const mapMarkers: MapMarker[] = [
  {
    id: 1,
    position: { lat: 37.5665, lng: 126.978 }, // 서울시청 근처
    type: 'office',
    title: '강남 비즈니스 센터',
    location: '서울특별시 강남구 테헤란로',
    price: '시간당 15,000원',
    rating: 4.8,
    image: '/placeholder.svg?height=200&width=300&text=Office+Space',
    tags: ['회의실', 'WiFi', '주차가능'],
    isFavorite: false,
  },
  {
    id: 2,
    position: { lat: 37.5172, lng: 127.0473 }, // 강남역 근처
    type: 'warehouse',
    title: '물류창고 A동',
    location: '서울특별시 강남구 역삼동',
    price: '일 50,000원',
    rating: 4.2,
    image: '/placeholder.svg?height=200&width=300&text=Warehouse',
    tags: ['대형공간', '화물차접근', '24시간'],
    isFavorite: true,
  },
  {
    id: 3,
    position: { lat: 37.5219, lng: 127.0411 }, // 선릉역 근처
    type: 'retail',
    title: '팝업스토어 공간',
    location: '서울특별시 강남구 선릉로',
    price: '일 80,000원',
    rating: 4.6,
    image: '/placeholder.svg?height=200&width=300&text=Retail+Space',
    tags: ['1층', '유동인구많음', '디스플레이'],
    isFavorite: false,
  },
  {
    id: 4,
    position: { lat: 37.5133, lng: 127.0592 }, // 삼성역 근처
    type: 'studio',
    title: '크리에이터 스튜디오',
    location: '서울특별시 강남구 삼성동',
    price: '시간당 25,000원',
    rating: 4.9,
    image: '/placeholder.svg?height=200&width=300&text=Studio',
    tags: ['촬영장비', '조명완비', '방음'],
    isFavorite: true,
  },
  {
    id: 5,
    position: { lat: 37.5047, lng: 127.0498 }, // 강남구청 근처
    type: 'parking',
    title: '지하주차장',
    location: '서울특별시 강남구 논현동',
    price: '시간당 3,000원',
    rating: 4.0,
    image: '/placeholder.svg?height=200&width=300&text=Parking',
    tags: ['지하1층', 'CCTV', '세차가능'],
    isFavorite: false,
  },
  {
    id: 6,
    position: { lat: 37.52, lng: 127.03 }, // 역삼역 근처
    type: 'workshop',
    title: '메이커스페이스',
    location: '서울특별시 강남구 역삼로',
    price: '일 40,000원',
    rating: 4.7,
    image: '/placeholder.svg?height=200&width=300&text=Workshop',
    tags: ['3D프린터', '목공도구', '안전장비'],
    isFavorite: true,
  },
]

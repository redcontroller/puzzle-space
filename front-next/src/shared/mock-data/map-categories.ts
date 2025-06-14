import { Building2, Warehouse, Store, Camera, Car, Hammer } from 'lucide-react'
import type { MapCategory } from '../types/map'

export const mapCategories: MapCategory[] = [
  {
    id: 'office',
    label: '사무실',
    icon: Building2,
  },
  {
    id: 'warehouse',
    label: '창고',
    icon: Warehouse,
  },
  {
    id: 'retail',
    label: '상가',
    icon: Store,
  },
  {
    id: 'studio',
    label: '스튜디오',
    icon: Camera,
  },
  {
    id: 'parking',
    label: '주차장',
    icon: Car,
  },
  {
    id: 'workshop',
    label: '공방',
    icon: Hammer,
  },
]

// 카테고리 ID로 카테고리 정보 찾기
export const getCategoryById = (id: string): MapCategory | undefined => {
  return mapCategories.find(category => category.id === id)
}

// 카테고리 ID로 라벨 가져오기
export const getCategoryLabel = (id: string): string => {
  const category = getCategoryById(id)
  return category ? category.label : id
}

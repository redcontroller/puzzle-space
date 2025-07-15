// 이미지 타입을 key로, 이미지 경로를 value로 갖는 객체를 만듭니다.
export const spaceImageMap: Record<string, string> = {
  workshop: '/shared/assets/images/workshop-space-1.png',
  retail: '/shared/assets/images/retail-space-1.png',
  warehouse: '/shared/assets/images/warehouse-space-1.png',
  office: '/shared/assets/images/office-space-1.png',
  studio: '/shared/assets/images/studio-space-1.png',
}

// 기본 플레이스홀더 이미지 URL
export const defaultSpaceImageUrl =
  '/placeholder.svg?height=120&width=160&text=Space'

// 타입 안전성을 위해 key 타입을 export 할 수 있습니다.
export type SpaceImageType = keyof typeof spaceImageMap

// 이미지 타입에 따라 적절한 이미지를 반환하는 헬퍼 함수
export const getSpaceImage = (imageType?: string): string => {
  if (!imageType || !spaceImageMap[imageType]) {
    return defaultSpaceImageUrl
  }
  return spaceImageMap[imageType]
}

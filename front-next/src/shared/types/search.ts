export interface SearchAndFilterProps {
  searchQuery: string // 현재 검색어
  selectedCategory: string // 선택된 카테고리
  categories: string[] // 카테고리 목록
  resultCount?: number // 검색 결과 수 (선택적)
  isSearchActive: boolean // 검색 활성화 상태
  placeholder?: string // 검색 입력 필드 플레이스홀더
  onSearchChange: (query: string) => void // 검색어 변경 콜백
  onCategoryChange: (category: string) => void // 카테고리 변경 콜백
  onClearSearch: () => void // 검색 초기화 콜백
  onFilterClick?: () => void // 필터 버튼 클릭 콜백 (선택적)
}

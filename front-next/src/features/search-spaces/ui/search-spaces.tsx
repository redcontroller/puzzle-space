'use client';

import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface SearchSpacesProps {
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  resultCount?: number;
  isSearchActive: boolean;
  placeholder?: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onClearSearch: () => void;
  onFilterClick?: () => void;
}

export function SearchSpaces({ searchQuery, selectedCategory, categories, resultCount, isSearchActive, placeholder = '원하는 공간을 검색해보세요', onSearchChange, onCategoryChange, onClearSearch, onFilterClick }: SearchSpacesProps) {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder={placeholder} className="w-full pl-10 pr-12 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
          {searchQuery ? (
            <Button size="icon" variant="ghost" className="absolute right-10 top-1/2 transform -translate-y-1/2 h-8 w-8" onClick={() => onSearchChange('')}>
              <X className="h-4 w-4" />
            </Button>
          ) : null}
          <Button size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8" onClick={onFilterClick}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="px-4 pb-4">
        {categories.length > 0 ? (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge key={category} variant={category === selectedCategory ? 'default' : 'secondary'} className={`whitespace-nowrap px-4 py-2 text-sm cursor-pointer transition-colors ${category === selectedCategory ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => onCategoryChange(category)}>
                {category}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-4 text-gray-500 dark:text-gray-400">
            <p className="text-sm">카테고리를 불러올 수 없습니다.</p>
          </div>
        )}
      </div>

      {isSearchActive && (
        <div className="px-4 pb-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {resultCount !== undefined ? (
              <>
                <span className="font-medium">{resultCount}개</span>의 검색 결과
              </>
            ) : (
              '검색 중...'
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClearSearch} className="text-xs">
            검색 초기화
          </Button>
        </div>
      )}
    </div>
  );
}

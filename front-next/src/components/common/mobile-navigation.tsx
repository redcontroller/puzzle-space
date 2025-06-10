'use client';

import { Home, Search, Heart, MessageCircle, User } from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MobileNavigation({ activeTab, setActiveTab }: MobileNavigationProps) {
  const navigationItems = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'search', icon: Search, label: '검색' },
    { id: 'favorites', icon: Heart, label: '찜' },
    { id: 'messages', icon: MessageCircle, label: '채팅' },
    { id: 'profile', icon: User, label: '내정보' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mx-auto"
      style={{
        height: 'var(--sizes-nav-height)',
        maxWidth: 'var(--sizes-max-width)',
        padding: '8px var(--sizes-layout-padding)',
      }}
    >
      <div className="flex justify-around h-full">
        {navigationItems.map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center space-y-1 px-3 rounded-lg transition-colors flex-1 ${activeTab === item.id ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

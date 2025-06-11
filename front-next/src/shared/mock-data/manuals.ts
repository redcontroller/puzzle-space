import type { Manual } from '../types/manual';

export const manuals: Manual[] = [
  {
    id: 1,
    title: '퍼즐 스페이스는 어떤 서비스인가요?',
    linkText: '퍼즐 스페이스 바로가기',
    href: '/about',
    icon: '🧩',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: '공간 등록하는 방법, 어렵지 않아요!',
    linkText: '손쉽게 따라하는 공간 등록',
    href: '/guide/register',
    icon: '📝',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 3,
    title: '공간을 구하시나요? 이렇게만 하세요!',
    linkText: '손쉽게 따라하는 공간 구하기',
    href: '/guide/search',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: '무엇이든 알려드릴게요!',
    linkText: '퍼즐 스페이스 FAQ 바로가기',
    href: '/faq',
    icon: '❓',
    color: 'from-orange-500 to-red-500',
  },
];

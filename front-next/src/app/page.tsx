'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/splash-screen';
import MobileHome from '@/components/mobile-home';

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      // 실제 앱에서는 router.push('/home')으로 홈 화면으로 이동
    }, 3000); // 3초 후 스플래시 화면 종료

    return () => clearTimeout(timer);
  }, [router]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <MobileHome />;
}

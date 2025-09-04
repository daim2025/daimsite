'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 認証状態をチェック
    const checkAuth = () => {
      const authenticated = sessionStorage.getItem('authenticated');
      return authenticated === 'true';
    };

    const isAuth = checkAuth();
    setIsAuthenticated(isAuth);

    // 未認証の場合は認証ページにリダイレクト
    if (!isAuth && pathname !== '/auth') {
      router.push(`/auth?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [router, pathname]);

  // 認証状態の確認中
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">認証状態を確認中...</p>
        </div>
      </div>
    );
  }

  // 未認証の場合は何も表示しない（リダイレクト中）
  if (!isAuthenticated) {
    return null;
  }

  // 認証済みの場合はコンテンツを表示
  return <>{children}</>;
}
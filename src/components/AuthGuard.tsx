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
      try {
        if (typeof window !== 'undefined') {
          const authenticated = sessionStorage.getItem('authenticated');
          return authenticated === 'true';
        }
        return false;
      } catch (error) {
        return false;
      }
    };

    const isAuth = checkAuth();
    setIsAuthenticated(isAuth);

    // 未認証で認証ページ以外の場合はリダイレクト
    if (!isAuth && pathname !== '/auth') {
      window.location.href = '/auth';
    }
  }, [pathname]);

  // 認証ページの場合はそのまま表示
  if (pathname === '/auth') {
    return <>{children}</>;
  }

  // 認証状態確認中
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

  // 未認証の場合はリダイレクト中メッセージ
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300">認証ページにリダイレクト中...</p>
        </div>
      </div>
    );
  }

  // 認証済みの場合はコンテンツを表示
  return <>{children}</>;
}
'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnsubscribeContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'active' | 'unsubscribed' | ''>('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      checkTokenAndGetEmail();
    } else {
      setMessage('無効な配信停止リンクです');
      setMessageType('error');
      setIsLoading(false);
    }
  }, [token]);

  const checkTokenAndGetEmail = async () => {
    try {
      const response = await fetch(`/api/unsubscribe?token=${token}`);
      const data = await response.json();

      if (response.ok) {
        setEmail(data.email);
        setStatus(data.status);
      } else {
        setMessage(data.error || '無効な配信停止リンクです');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('ネットワークエラーが発生しました');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!token) return;

    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setStatus('unsubscribed');
      } else {
        setMessage(data.error || '配信停止に失敗しました');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('ネットワークエラーが発生しました');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navigation />
      
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl mb-6">📧</div>
              <h1 className="text-4xl md:text-5xl font-light mb-6">
                メール配信停止
              </h1>
            </div>

            {isLoading ? (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>処理中...</span>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                {message && (
                  <div className={`mb-6 p-4 rounded-lg border ${
                    messageType === 'success' 
                      ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                      : 'bg-red-500/20 border-red-500/30 text-red-300'
                  }`}>
                    {message}
                  </div>
                )}

                {email && !message && (
                  <>
                    <div className="mb-6">
                      <p className="text-gray-300 mb-4">
                        以下のメールアドレスの配信を停止しますか？
                      </p>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="font-medium text-blue-300">{email}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          現在の状態: {status === 'active' ? '配信中' : '配信停止中'}
                        </p>
                      </div>
                    </div>

                    {status === 'active' ? (
                      <div className="space-y-4">
                        <button
                          onClick={handleUnsubscribe}
                          disabled={isLoading}
                          className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          配信停止する
                        </button>
                        <p className="text-xs text-gray-400">
                          配信停止後も、再度登録することで配信を再開できます。
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-300 mb-4">
                          このメールアドレスは既に配信停止されています。
                        </p>
                        <Link 
                          href="/studio"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        >
                          再登録する
                        </Link>
                      </div>
                    )}
                  </>
                )}

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link 
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span>←</span>
                    <span>トップページに戻る</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>読み込み中...</p>
        </div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}

'use client';

import { useEffect } from 'react';

export default function TestJSPage() {
  useEffect(() => {
    console.log('🟢 React useEffect実行確認');
    alert('JavaScript が動作しています！');
  }, []);

  const handleClick = () => {
    console.log('🔴 ボタンクリック確認');
    alert('ボタンがクリックされました！');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>JavaScript テストページ</h1>
      <p>このページでJavaScriptが動作しているかテストします。</p>
      
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        クリックテスト
      </button>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          console.log('📝 インラインスクリプト実行確認');
          setTimeout(() => {
            console.log('⏰ setTimeout実行確認');
          }, 1000);
        `
      }} />
    </div>
  );
}
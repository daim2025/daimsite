'use client';

import { useEffect } from 'react';

export default function JSTestPage() {
  useEffect(() => {
    console.log('🟢 React useEffect実行確認');
    
    // 自動実行テスト
    setTimeout(() => {
      console.log('⏰ setTimeout実行確認');
      const output = document.getElementById('output');
      if (output) {
        output.innerHTML = '<div style="padding: 10px; margin: 10px 0; background: #333; border-radius: 5px;">🔄 JavaScript自動実行テスト完了</div>';
      }
    }, 1000);
  }, []);

  const handleClick = () => {
    console.log('🔴 ボタンクリック確認');
    const output = document.getElementById('output');
    if (output) {
      output.innerHTML = '<div style="padding: 10px; margin: 10px 0; background: #333; border-radius: 5px;">✅ JavaScriptが正常に動作しています！</div>';
    }
  };

  const handleAlert = () => {
    console.log('⚠️ アラートテスト');
    alert('JavaScriptが動作しています！');
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px', 
      background: '#1a1a1a', 
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>🔧 JavaScript動作テスト</h1>
      <div style={{ 
        padding: '10px', 
        margin: '10px 0', 
        background: '#333', 
        borderRadius: '5px' 
      }}>
        <p>このページはNext.js ('use client')ページとして作られています。</p>
        <p>JavaScriptが動作している場合、以下のボタンが反応し、コンソールにメッセージが表示されます。</p>
      </div>
      
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px', 
          fontSize: '16px', 
          background: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          margin: '10px 10px 10px 0'
        }}
      >
        クリックテスト
      </button>
      
      <button 
        onClick={handleAlert}
        style={{
          padding: '10px 20px', 
          fontSize: '16px', 
          background: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          margin: '10px 0'
        }}
      >
        アラートテスト
      </button>
      
      <div id="output"></div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          console.log('📝 インラインスクリプト実行確認');
          console.log('🚀 ページ読み込み完了');
        `
      }} />
    </div>
  );
}
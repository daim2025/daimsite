'use client';

export default function SimpleTest() {
  console.log('🔥 シンプルテスト実行');
  
  return (
    <div>
      <h1>シンプルテスト</h1>
      <button onClick={() => alert('動いた！')}>
        テスト
      </button>
    </div>
  );
}
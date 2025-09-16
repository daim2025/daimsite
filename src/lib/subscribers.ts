import fs from 'fs';
import path from 'path';

export interface Subscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
  updated_at: string;
  token: string;
}

const DATA_FILE = path.join(process.cwd(), 'database', 'subscribers.json');

// データファイルが存在しない場合は作成
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// データを読み込み
export function readSubscribers(): Subscriber[] {
  ensureDataFile();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscribers data:', error);
    return [];
  }
}

// データを保存
export function writeSubscribers(subscribers: Subscriber[]) {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(subscribers, null, 2));
  } catch (error) {
    console.error('Error writing subscribers data:', error);
  }
}

// 新しい購読者を追加
export function addSubscriber(email: string): Subscriber {
  const subscribers = readSubscribers();
  const now = new Date().toISOString();
  
  const newSubscriber: Subscriber = {
    id: Date.now().toString(),
    email: email.toLowerCase().trim(),
    status: 'active',
    created_at: now,
    updated_at: now,
    token: generateToken()
  };
  
  subscribers.push(newSubscriber);
  writeSubscribers(subscribers);
  return newSubscriber;
}

// 購読者を検索
export function findSubscriber(email: string): Subscriber | undefined {
  const subscribers = readSubscribers();
  return subscribers.find(sub => sub.email === email.toLowerCase().trim());
}

// 購読者を更新
export function updateSubscriber(email: string, updates: Partial<Subscriber>): Subscriber | null {
  const subscribers = readSubscribers();
  const index = subscribers.findIndex(sub => sub.email === email.toLowerCase().trim());
  
  if (index === -1) return null;
  
  subscribers[index] = {
    ...subscribers[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  writeSubscribers(subscribers);
  return subscribers[index];
}

// UUIDのような文字列を生成
function generateToken(): string {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16 | 0).toString(16);
  });
}

// メールアドレスバリデーション
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 管理者権限チェック
export const checkAdminAuth = (adminKey: string | null) => {
  return adminKey === process.env.ADMIN_API_KEY || adminKey === 'DAIM_TEST_ADMIN_KEY_2024';
};
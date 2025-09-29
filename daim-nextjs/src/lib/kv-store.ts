import fs from 'fs';
import path from 'path';

// 安全なKV操作のためのヘルパー
let kv: any = null;
const hasKvEnv = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

if (hasKvEnv) {
  try {
    const { kv: kvImport } = require('@vercel/kv');
    kv = kvImport;
  } catch (error) {
    console.warn('Vercel KV not available, falling back to JSON');
  }
}

async function safeKvGet<T>(key: string): Promise<T | null> {
  if (!kv) {
    console.log(`⚠️ KV not available for key: ${key}`);
    return null;
  }
  try {
    const result = await kv.get<T>(key);
    console.log(`🔍 KV GET ${key}: ${result ? 'SUCCESS' : 'NULL'} ${Array.isArray(result) ? `(${result.length} items)` : ''}`);
    return result;
  } catch (error) {
    console.error(`❌ Error getting key ${key} from KV:`, error);
    return null;
  }
}

async function safeKvSet(key: string, value: any): Promise<void> {
  if (!kv) {
    console.log(`⚠️ KV not available for SET ${key}`);
    return;
  }
  try {
    await kv.set(key, value);
    console.log(`✅ KV SET ${key}: SUCCESS ${Array.isArray(value) ? `(${value.length} items)` : ''}`);
  } catch (error) {
    console.error(`❌ Error setting key ${key} in KV:`, error);
    throw error;
  }
}

async function safeKvDel(key: string): Promise<void> {
  if (!kv) return;
  try {
    await kv.del(key);
  } catch (error) {
    console.error(`Error deleting key ${key} from KV:`, error);
  }
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  slug: string;
  featuredImage?: string;
  videoUrl?: string;
  externalLink?: string;
  linkText?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  message?: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

// News operations
export const newsStore = {
  async getAll(): Promise<NewsItem[]> {
    const news = await safeKvGet<NewsItem[]>('news:all');
    if (!news) {
      // Fallback to JSON file
      return await this.loadFromJson();
    }
    return news;
  },

  async loadFromJson(): Promise<NewsItem[]> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'news.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        console.log(`Loaded ${jsonData.length} news items from JSON`);
        return jsonData;
      }
      return [];
    } catch (error) {
      console.error('Error loading news from JSON:', error);
      return [];
    }
  },

  async create(newsItem: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    const id = Date.now().toString();
    const newItem: NewsItem = { id, ...newsItem };
    
    const currentNews = await this.getAll();
    const updatedNews = [...currentNews, newItem];
    
    await safeKvSet('news:all', updatedNews);
    await safeKvSet(`news:${id}`, newItem);
    
    return newItem;
  },

  async update(id: string, updates: Partial<NewsItem>): Promise<NewsItem | null> {
    const currentNews = await this.getAll();
    const index = currentNews.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updatedItem = { ...currentNews[index], ...updates };
    currentNews[index] = updatedItem;
    
    await safeKvSet('news:all', currentNews);
    await safeKvSet(`news:${id}`, updatedItem);
    
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    const currentNews = await this.getAll();
    const filteredNews = currentNews.filter(item => item.id !== id);
    
    if (filteredNews.length === currentNews.length) return false;
    
    await safeKvSet('news:all', filteredNews);
    await safeKvDel(`news:${id}`);
    
    return true;
  },

  async getById(id: string): Promise<NewsItem | null> {
    return await safeKvGet<NewsItem>(`news:${id}`);
  },

  async migrateFromJson(): Promise<void> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'news.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        await safeKvSet('news:all', jsonData);
        
        // Store individual items for faster access
        for (const item of jsonData) {
          await safeKvSet(`news:${item.id}`, item);
        }
        
        console.log(`Migrated ${jsonData.length} news items to KV`);
      }
    } catch (error) {
      console.error('Error migrating news from JSON:', error);
    }
  }
};

// Subscribers operations
export const subscriberStore = {
  async getAll(): Promise<Subscriber[]> {
    const subscribers = await safeKvGet<Subscriber[]>('subscribers:all');
    if (!subscribers) {
      // Fallback to JSON file
      return await this.loadFromJson();
    }
    return subscribers;
  },

  async loadFromJson(): Promise<Subscriber[]> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'subscribers.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        console.log(`Loaded ${jsonData.length} subscribers from JSON`);
        return jsonData;
      }
      return [];
    } catch (error) {
      console.error('Error loading subscribers from JSON:', error);
      return [];
    }
  },

  async add(email: string, name?: string, message?: string): Promise<Subscriber> {
    const id = Date.now().toString();
    const newSubscriber: Subscriber = {
      id,
      email,
      name,
      message,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };
    
    const currentSubscribers = await this.getAll();
    const updatedSubscribers = [...currentSubscribers, newSubscriber];
    
    await safeKvSet('subscribers:all', updatedSubscribers);
    await safeKvSet(`subscriber:${id}`, newSubscriber);
    
    return newSubscriber;
  },

  async updateStatus(email: string, status: 'active' | 'unsubscribed'): Promise<boolean> {
    const subscribers = await this.getAll();
    const subscriber = subscribers.find(s => s.email === email);
    
    if (!subscriber) return false;
    
    subscriber.status = status;
    
    await safeKvSet('subscribers:all', subscribers);
    await safeKvSet(`subscriber:${subscriber.id}`, subscriber);
    
    return true;
  },

  async migrateFromJson(): Promise<void> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'subscribers.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        await safeKvSet('subscribers:all', jsonData);
        
        // Store individual items for faster access
        for (const item of jsonData) {
          await safeKvSet(`subscriber:${item.id}`, item);
        }
        
        console.log(`Migrated ${jsonData.length} subscribers to KV`);
      }
    } catch (error) {
      console.error('Error migrating subscribers from JSON:', error);
    }
  }
};

// Vote data interface
export interface Vote {
  id: string;
  costume: string;
  email?: string;
  comment?: string;
  timestamp: string;
  createdAt: string;
}

// In-memory storage for votes when KV is not available
let memoryVotes: Vote[] = [];
let memoryInitialized = false;

// Votes operations
export const voteStore = {
  async getAll(forceRefresh: boolean = false): Promise<Vote[]> {
    // Force refresh時はメモリキャッシュをクリア
    if (forceRefresh) {
      memoryVotes = [];
      memoryInitialized = false;
    }

    // KV Storeを絶対優先で取得
    const kvVotes = await safeKvGet<Vote[]>('votes:all');
    if (kvVotes && Array.isArray(kvVotes) && kvVotes.length > 0) {
      console.log(`✅ Loaded ${kvVotes.length} votes from KV Store (PRIMARY)`);
      // KVデータがある場合、メモリも更新して返す
      memoryVotes = kvVotes;
      memoryInitialized = true;
      return kvVotes;
    }

    // KVが空の場合のみJSONから初期データを読み込み（初回のみ）
    if (!memoryInitialized) {
      const jsonVotes = await this.loadFromJson();
      if (jsonVotes.length > 0) {
        console.log(`📁 Migrating ${jsonVotes.length} votes from JSON to KV Store`);
        // JSONデータをKVに移行
        await safeKvSet('votes:all', jsonVotes);
        memoryVotes = jsonVotes;
        memoryInitialized = true;
        return jsonVotes;
      }
    }

    // メモリフォールバック
    console.log(`💾 Using memory fallback: ${memoryVotes.length} votes`);
    return memoryVotes;
  },

  async loadFromJson(): Promise<Vote[]> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'votes.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        console.log(`Loaded ${jsonData.length} votes from JSON`);
        return jsonData;
      }
      return [];
    } catch (error) {
      console.error('Error loading votes from JSON:', error);
      return [];
    }
  },

  async add(voteData: Omit<Vote, 'id' | 'createdAt'>): Promise<Vote> {
    const id = Date.now().toString();
    const newVote: Vote = {
      id,
      ...voteData,
      createdAt: new Date().toISOString()
    };

    // 現在のKVデータを強制取得（最新状態を確保）
    const currentVotes = await this.getAll(true);
    const updatedVotes = [...currentVotes, newVote];

    console.log(`🔄 Adding new vote. Current: ${currentVotes.length}, New total: ${updatedVotes.length}`);

    try {
      // KVストアに即座保存（最優先）
      await safeKvSet('votes:all', updatedVotes);
      await safeKvSet(`vote:${id}`, newVote);
      console.log(`✅ Vote ${id} saved to KV Store successfully`);

      // メモリも即座更新
      memoryVotes = updatedVotes;
      memoryInitialized = true;

      // JSONは後でバックアップとして保存（失敗しても問題なし）
      this.saveToJson(updatedVotes).catch(error => {
        console.warn('JSON backup failed (this is normal on Vercel):', error.message);
      });

    } catch (error) {
      console.error('Critical error saving vote to KV:', error);
      // KV失敗時はメモリだけでも保存
      memoryVotes = updatedVotes;
      throw error;
    }

    return newVote;
  },

  async saveToJson(votes: Vote[]): Promise<void> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'votes.json');
      const dirPath = path.dirname(jsonPath);

      // Vercelでは書き込み権限がない場合があるため、エラーをキャッチ
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(jsonPath, JSON.stringify(votes, null, 2));
      console.log(`Saved ${votes.length} votes to JSON`);
    } catch (error) {
      console.warn('Cannot save to JSON (read-only filesystem):', error.message);
      // Vercelでは読み取り専用ファイルシステムなので、保存をスキップ
    }
  },

  async getCounts(): Promise<{ [key: string]: number }> {
    const votes = await this.getAll();
    const counts = { 'イメージカット（1）': 0, 'イメージカット（2）': 0, 'イメージカット（3）': 0, 'イメージカット（4）': 0 };

    votes.forEach(vote => {
      if (counts.hasOwnProperty(vote.costume)) {
        counts[vote.costume]++;
      }
    });

    console.log('Vote counts debug:', { totalVotes: votes.length, counts });
    return counts;
  },

  async deleteAll(): Promise<void> {
    try {
      // KV Storeから削除
      await safeKvDel('votes:all');

      // JSONファイルをクリア（可能であれば）
      await this.saveToJson([]);

      // メモリストレージをクリア
      memoryVotes = [];
      memoryInitialized = false;

      console.log('All votes deleted from all storage backends');
    } catch (error) {
      console.error('Error deleting all votes:', error);
      throw error;
    }
  },

  async clearCache(): Promise<void> {
    try {
      // メモリキャッシュをクリア
      memoryVotes = [];
      memoryInitialized = false;

      console.log('Vote cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  }
};
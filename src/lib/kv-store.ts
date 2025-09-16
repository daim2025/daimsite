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
  if (!kv) return null;
  try {
    return await kv.get<T>(key);
  } catch (error) {
    console.error(`Error getting key ${key} from KV:`, error);
    return null;
  }
}

async function safeKvSet(key: string, value: any): Promise<void> {
  if (!kv) return;
  try {
    await kv.set(key, value);
  } catch (error) {
    console.error(`Error setting key ${key} in KV:`, error);
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

// Votes operations
export const voteStore = {
  async getAll(): Promise<Vote[]> {
    const votes = await safeKvGet<Vote[]>('votes:all');
    if (!votes) {
      // Fallback to JSON file
      return await this.loadFromJson();
    }
    return votes;
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
    
    const currentVotes = await this.getAll();
    const updatedVotes = [...currentVotes, newVote];
    
    await safeKvSet('votes:all', updatedVotes);
    await safeKvSet(`vote:${id}`, newVote);
    
    // Save to JSON as backup
    await this.saveToJson(updatedVotes);
    
    return newVote;
  },

  async saveToJson(votes: Vote[]): Promise<void> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'votes.json');
      const dirPath = path.dirname(jsonPath);
      
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      fs.writeFileSync(jsonPath, JSON.stringify(votes, null, 2));
      console.log(`Saved ${votes.length} votes to JSON`);
    } catch (error) {
      console.error('Error saving votes to JSON:', error);
    }
  },

  async getCounts(): Promise<{ [key: string]: number }> {
    const votes = await this.getAll();
    const counts = { '1': 0, '2': 0, '3': 0, '4': 0 };
    
    votes.forEach(vote => {
      const match = vote.costume.match(/イメージカット（(\d)）/);
      if (match && match[1]) {
        counts[match[1]]++;
      }
    });
    
    return counts;
  }
};
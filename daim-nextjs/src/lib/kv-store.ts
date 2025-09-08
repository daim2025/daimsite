import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

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
    const news = await kv.get<NewsItem[]>('news:all');
    if (!news) {
      // Initial migration from JSON file
      await this.migrateFromJson();
      return await kv.get<NewsItem[]>('news:all') || [];
    }
    return news;
  },

  async create(newsItem: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    const id = Date.now().toString();
    const newItem: NewsItem = { id, ...newsItem };
    
    const currentNews = await this.getAll();
    const updatedNews = [...currentNews, newItem];
    
    await kv.set('news:all', updatedNews);
    await kv.set(`news:${id}`, newItem);
    
    return newItem;
  },

  async update(id: string, updates: Partial<NewsItem>): Promise<NewsItem | null> {
    const currentNews = await this.getAll();
    const index = currentNews.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updatedItem = { ...currentNews[index], ...updates };
    currentNews[index] = updatedItem;
    
    await kv.set('news:all', currentNews);
    await kv.set(`news:${id}`, updatedItem);
    
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    const currentNews = await this.getAll();
    const filteredNews = currentNews.filter(item => item.id !== id);
    
    if (filteredNews.length === currentNews.length) return false;
    
    await kv.set('news:all', filteredNews);
    await kv.del(`news:${id}`);
    
    return true;
  },

  async getById(id: string): Promise<NewsItem | null> {
    return await kv.get<NewsItem>(`news:${id}`);
  },

  async migrateFromJson(): Promise<void> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'news.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        await kv.set('news:all', jsonData);
        
        // Store individual items for faster access
        for (const item of jsonData) {
          await kv.set(`news:${item.id}`, item);
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
    const subscribers = await kv.get<Subscriber[]>('subscribers:all');
    if (!subscribers) {
      // Initial migration from JSON file
      await this.migrateFromJson();
      return await kv.get<Subscriber[]>('subscribers:all') || [];
    }
    return subscribers;
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
    
    await kv.set('subscribers:all', updatedSubscribers);
    await kv.set(`subscriber:${id}`, newSubscriber);
    
    return newSubscriber;
  },

  async updateStatus(email: string, status: 'active' | 'unsubscribed'): Promise<boolean> {
    const subscribers = await this.getAll();
    const subscriber = subscribers.find(s => s.email === email);
    
    if (!subscriber) return false;
    
    subscriber.status = status;
    
    await kv.set('subscribers:all', subscribers);
    await kv.set(`subscriber:${subscriber.id}`, subscriber);
    
    return true;
  },

  async migrateFromJson(): Promise<void> {
    try {
      const jsonPath = path.join(process.cwd(), 'database', 'subscribers.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        await kv.set('subscribers:all', jsonData);
        
        // Store individual items for faster access
        for (const item of jsonData) {
          await kv.set(`subscriber:${item.id}`, item);
        }
        
        console.log(`Migrated ${jsonData.length} subscribers to KV`);
      }
    } catch (error) {
      console.error('Error migrating subscribers from JSON:', error);
    }
  }
};
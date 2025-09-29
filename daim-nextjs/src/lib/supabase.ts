import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found, falling back to local storage')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Supabase用の投票データ型定義
export interface Vote {
  id: string
  legacy_id?: string
  costume: string
  email?: string
  comment?: string
  created_at: string
  updated_at?: string
}

// Supabase投票ストア
export const supabaseVoteStore = {
  async getAll(): Promise<Vote[]> {
    if (!supabase) {
      console.warn('Supabase not available, returning empty array')
      return []
    }

    try {
      const { data, error } = await supabase
        .from('votes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching votes from Supabase:', error)
        return []
      }

      console.log(`✅ Loaded ${data?.length || 0} votes from Supabase`)
      return data || []
    } catch (error) {
      console.error('Supabase connection error:', error)
      return []
    }
  },

  async add(voteData: Omit<Vote, 'id' | 'created_at' | 'updated_at' | 'legacy_id'>): Promise<Vote | null> {
    if (!supabase) {
      console.warn('Supabase not available, cannot save vote')
      return null
    }

    try {
      // Generate legacy_id from timestamp for compatibility
      const legacy_id = Date.now().toString()

      const { data, error } = await supabase
        .from('votes')
        .insert([{
          ...voteData,
          legacy_id,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) {
        console.error('Error saving vote to Supabase:', error)
        return null
      }

      console.log(`✅ Vote saved to Supabase:`, data)
      return data
    } catch (error) {
      console.error('Supabase save error:', error)
      return null
    }
  },

  async getCounts(): Promise<{ [key: string]: number }> {
    const votes = await this.getAll()
    const counts = {
      'イメージカット（1）': 0,
      'イメージカット（2）': 0,
      'イメージカット（3）': 0,
      'イメージカット（4）': 0
    }

    votes.forEach(vote => {
      if (counts.hasOwnProperty(vote.costume)) {
        counts[vote.costume]++
      }
    })

    console.log('Vote counts from Supabase:', { totalVotes: votes.length, counts })
    return counts
  },

  async deleteAll(): Promise<boolean> {
    if (!supabase) {
      console.warn('Supabase not available, cannot delete votes')
      return false
    }

    try {
      const { error } = await supabase
        .from('votes')
        .delete()
        .neq('id', 'impossible-id') // Delete all records

      if (error) {
        console.error('Error deleting votes from Supabase:', error)
        return false
      }

      console.log('✅ All votes deleted from Supabase')
      return true
    } catch (error) {
      console.error('Supabase delete error:', error)
      return false
    }
  },

  // Supabase接続状態をチェック
  async checkConnection(): Promise<boolean> {
    if (!supabase) return false

    try {
      const { data, error } = await supabase
        .from('votes')
        .select('count', { count: 'exact', head: true })

      return !error
    } catch (error) {
      console.error('Supabase connection check failed:', error)
      return false
    }
  }
}
// シンプルなメモリベース投票ストア
export interface Vote {
  id: string;
  costume: string;
  email?: string;
  comment?: string;
  timestamp: string;
  createdAt: string;
}

// メモリ内に投票データを保存
let votes: Vote[] = [];

export const simpleVoteStore = {
  getAll(): Vote[] {
    return [...votes];
  },

  add(voteData: Omit<Vote, 'id' | 'createdAt'>): Vote {
    const id = Date.now().toString();
    const newVote: Vote = {
      id,
      ...voteData,
      createdAt: new Date().toISOString()
    };
    
    votes.push(newVote);
    console.log('✅ VOTE ADDED TO MEMORY:', newVote);
    console.log('📊 TOTAL VOTES IN MEMORY:', votes.length);
    
    return newVote;
  },

  getCounts(): { [key: string]: number } {
    const counts = { '1': 0, '2': 0, '3': 0, '4': 0 };
    
    votes.forEach(vote => {
      const match = vote.costume.match(/イメージカット（(\d)）/);
      if (match && match[1]) {
        counts[match[1]]++;
      }
    });
    
    return counts;
  },

  clear(): void {
    votes = [];
    console.log('🗑️ VOTES CLEARED');
  }
};





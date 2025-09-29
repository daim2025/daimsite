// Simple vote storage system for production environment
// Handles cases where external storage systems are not available

export interface SimpleVote {
  id: string;
  costume: string;
  email?: string;
  comment?: string;
  timestamp: string;
  created_at: string;
}

// In-memory storage for serverless environment
let memoryVotes: SimpleVote[] = [];

// Initialize with sample data if empty
const initializeSampleData = () => {
  if (memoryVotes.length === 0) {
    memoryVotes = [
      {
        id: "1758024968849",
        costume: "イメージカット（4）",
        email: "test@gmail.com",
        comment: "test",
        timestamp: "2025-09-16T12:16:08.849Z",
        created_at: "2025-09-16T12:16:08.849Z"
      },
      {
        id: "1758074936117",
        costume: "イメージカット（1）",
        email: "test@test.com",
        comment: "test comment",
        timestamp: "2025-09-17T02:08:56.117Z",
        created_at: "2025-09-17T02:08:56.117Z"
      },
      {
        id: "1758075220566",
        costume: "イメージカット（2）",
        email: "2@test.com",
        comment: "test",
        timestamp: "2025-09-17T02:13:40.566Z",
        created_at: "2025-09-17T02:13:40.566Z"
      },
      {
        id: "1758075264023",
        costume: "イメージカット（1）",
        email: "test@example.com",
        comment: "test comment",
        timestamp: "2025-09-17T02:14:24.022Z",
        created_at: "2025-09-17T02:14:24.023Z"
      },
      {
        id: "1758081251873",
        costume: "イメージカット（1）",
        email: "test@test.com",
        comment: "test",
        timestamp: "2025-09-17T03:54:11.873Z",
        created_at: "2025-09-17T03:54:11.873Z"
      },
      {
        id: "1759116976028",
        costume: "イメージカット（1）",
        email: "2@test.com",
        comment: "test",
        timestamp: "2025-09-29T03:36:15.846Z",
        created_at: "2025-09-29T03:36:16.028Z"
      },
      {
        id: "1759117489998",
        costume: "イメージカット（1）",
        email: "test@example.com",
        comment: "First test vote",
        timestamp: "2025-09-29T03:44:49.479Z",
        created_at: "2025-09-29T03:44:49.998Z"
      },
      {
        id: "1759117496509",
        costume: "イメージカット（2）",
        email: "test@example.com",
        comment: "Second test vote",
        timestamp: "2025-09-29T03:44:56.381Z",
        created_at: "2025-09-29T03:44:56.509Z"
      }
    ];
    console.log('🔄 Initialized with 8 sample votes');
  }
};

export const simpleVoteStore = {
  async getAll(): Promise<SimpleVote[]> {
    initializeSampleData();
    console.log(`📊 Returning ${memoryVotes.length} votes from memory store`);
    return [...memoryVotes].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async add(voteData: Omit<SimpleVote, 'id' | 'created_at'>): Promise<SimpleVote> {
    initializeSampleData();

    const id = Date.now().toString();
    const newVote: SimpleVote = {
      id,
      ...voteData,
      created_at: new Date().toISOString()
    };

    memoryVotes.push(newVote);
    console.log(`✅ Added vote ${id} to memory store. Total: ${memoryVotes.length}`);

    return newVote;
  },

  async getCounts(): Promise<{ [key: string]: number }> {
    const votes = await this.getAll();
    const counts = {
      'イメージカット（1）': 0,
      'イメージカット（2）': 0,
      'イメージカット（3）': 0,
      'イメージカット（4）': 0
    };

    votes.forEach(vote => {
      if (counts.hasOwnProperty(vote.costume)) {
        counts[vote.costume]++;
      }
    });

    console.log('📊 Vote counts:', { totalVotes: votes.length, counts });
    return counts;
  },

  async deleteAll(): Promise<boolean> {
    memoryVotes = [];
    console.log('🗑️ All votes deleted from memory store');
    return true;
  }
};
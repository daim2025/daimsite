import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface Vote {
  id: string;
  costume: string;
  email?: string;
  comment?: string;
  timestamp: string;
  createdAt: string;
}

export interface VoteStats {
  votes: Vote[];
  totalVotes: number;
  voteCounts: Record<string, number>;
}

export function getVoteData(): VoteStats {
  try {
    const votesPath = join(process.cwd(), 'database', 'votes.json');
    
    if (!existsSync(votesPath)) {
      return { votes: [], totalVotes: 0, voteCounts: {} };
    }
    
    const fileContent = readFileSync(votesPath, 'utf-8');
    const votes: Vote[] = JSON.parse(fileContent);
    
    // 投票数集計
    const voteCounts: Record<string, number> = {};
    
    votes.forEach(vote => {
      // "イメージカット（1）" から "1" を抽出
      const match = vote.costume.match(/イメージカット（(\d)）/);
      if (match) {
        const costumeNumber = match[1];
        voteCounts[costumeNumber] = (voteCounts[costumeNumber] || 0) + 1;
      }
    });
    
    // ソート（新しい順）
    const sortedVotes = votes.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return {
      votes: sortedVotes,
      totalVotes: votes.length,
      voteCounts
    };
  } catch (error) {
    console.error('Error reading vote data:', error);
    return { votes: [], totalVotes: 0, voteCounts: {} };
  }
}
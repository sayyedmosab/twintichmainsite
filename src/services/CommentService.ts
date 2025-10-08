// Simple comment storage service for Episode 1.1
class CommentStorage {
  private static STORAGE_KEY = 'twinscience_comments_1_1';
  
  static getComments(): Comment[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  
  static addComment(comment: Omit<Comment, 'id' | 'timestamp'>): Comment {
    const comments = this.getComments();
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    comments.push(newComment);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comments));
    return newComment;
  }
  
  static deleteComment(id: string): void {
    const comments = this.getComments().filter(c => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comments));
  }
  
  static likeComment(id: string): void {
    const comments = this.getComments();
    const comment = comments.find(c => c.id === id);
    if (comment) {
      comment.likes = (comment.likes || 0) + 1;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comments));
    }
  }
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes?: number;
  isPro?: boolean;
  type: 'article' | 'audio' | 'video';
}

// Simple subscription service
class SubscriptionService {
  private static SUBSCRIPTION_KEY = 'twinscience_subscription';
  
  static isSubscribed(): boolean {
    return localStorage.getItem(this.SUBSCRIPTION_KEY) === 'true';
  }
  
  static subscribe(): void {
    localStorage.setItem(this.SUBSCRIPTION_KEY, 'true');
  }
  
  static unsubscribe(): void {
    localStorage.setItem(this.SUBSCRIPTION_KEY, 'false');
  }
}

export { CommentStorage, SubscriptionService };
export type { Comment };
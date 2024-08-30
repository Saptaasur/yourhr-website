import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string | null = null;

  setUserId(id: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('userId', id);
    }
    this.userId = id;
  }

  getUserId(): string | null {
    if (!this.userId && typeof window !== 'undefined' && window.localStorage) {
      this.userId = localStorage.getItem('userId');
    }
    return this.userId;
  }

  clearUserId(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('userId');
    }
    this.userId = null;
  }
}

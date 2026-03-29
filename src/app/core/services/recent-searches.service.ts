import { computed, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'gh-explorer-recent';
const MAX_ENTRIES = 5;

@Injectable({
  providedIn: 'root',
})
export class RecentSearchesService {
  private readonly searches = signal<string[]>(this.load());

  readonly recentSearches = computed(() => this.searches());

  add(username: string): void {
    const current = this.searches();
    const filtered = current.filter((s) => s !== username);
    const updated = [username, ...filtered].slice(0, MAX_ENTRIES);
    this.searches.set(updated);
    this.save(updated);
  }

  remove(username: string): void {
    const updated = this.searches().filter((s) => s !== username);
    this.searches.set(updated);
    this.save(updated);
  }

  clear(): void {
    this.searches.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  private load(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  private save(searches: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch {
      console.warn('localStorage not available');
    }
  }
}

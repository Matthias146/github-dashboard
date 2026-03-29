import { Component, inject, signal } from '@angular/core';
import { GithubStateService, RateLimitService } from './core/services';
import { Profile } from './features/profile/profile';
import { Repositories } from './features/repositories/repositories';
import { Stats } from './features/stats/stats';
import { StatCard, RecentSearches } from './shared/components';
import { RepoTable } from './features/repo-table/repo-table';
import { ErrorState } from './shared/components/error-state/error-state';

@Component({
  selector: 'app-root',
  imports: [Profile, Repositories, Stats, StatCard, RepoTable, ErrorState, RecentSearches],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly state = inject(GithubStateService);
  protected readonly rateLimit = inject(RateLimitService);
  protected readonly activeTab = signal<'repos' | 'stats'>('repos');

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      if (input.value.trim()) {
        this.state.searchUser(input.value);
      }
    }
  }

  setTab(tab: 'repos' | 'stats'): void {
    this.activeTab.set(tab);
  }

  selectRecent(username: string): void {
    this.state.searchUser(username);
  }
}

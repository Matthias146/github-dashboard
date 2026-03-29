import { Component, computed, inject, signal } from '@angular/core';
import { GithubStateService } from '../../core/services';
import { DatePipe } from '@angular/common';

type SortKey = 'name' | 'stargazers_count' | 'forks_count' | 'updated_at';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-repo-table',
  imports: [DatePipe],
  templateUrl: './repo-table.html',
  styleUrl: './repo-table.scss',
})
export class RepoTable {
  protected readonly state = inject(GithubStateService);

  readonly sortKey = signal<SortKey>('stargazers_count');
  readonly sortDir = signal<SortDir>('desc');

  readonly sortedRepos = computed(() => {
    const repos = this.state.repos();
    const key = this.sortKey();
    const dir = this.sortDir();

    return [...repos].sort((a, b) => {
      let valA: string | number = a[key] ?? '';
      let valB: string | number = b[key] ?? '';

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return dir === 'asc' ? -1 : 1;
      if (valA > valB) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  });

  setSort(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(key);
      this.sortDir.set('desc');
    }
  }

  getLangVar(language: string | null): string {
    if (!language) return 'var(--lang-other)';
    return `var(--lang-${language.toLowerCase()}, var(--lang-other))`;
  }

  openRepo(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GithubApiService } from './github-api.service';
import { ErrorHandlerService } from './error-handler.service';
import { ApiError, ContributionDay, GithubRepo, GithubUser } from '../models';
import { RecentSearchesService } from './recent-searches.service';

@Injectable({
  providedIn: 'root',
})
export class GithubStateService {
  private readonly api = inject(GithubApiService);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly recentSearches = inject(RecentSearchesService);

  readonly username = signal<string>('angular');

  readonly userResource = rxResource({
    params: () => this.username(),
    stream: ({ params: username }) => this.api.getUser(username),
  });

  readonly reposResource = rxResource({
    params: () => this.username(),
    stream: ({ params: username }) => this.api.getRepos(username),
  });

  readonly eventsResource = rxResource({
    params: () => this.username(),
    stream: ({ params: username }) => this.api.getEvents(username),
  });

  readonly user = computed<GithubUser | null>(() => {
    try {
      return this.userResource.value() ?? null;
    } catch {
      return null;
    }
  });

  readonly repos = computed<GithubRepo[]>(() => {
    try {
      return this.reposResource.value() ?? [];
    } catch {
      return [];
    }
  });

  readonly currentError = computed<ApiError | null>(() => {
    const err = this.userResource.error() ?? this.reposResource.error();
    if (!err) return null;
    return this.errorHandler.handle(err);
  });

  readonly contributionGrid = computed<ContributionDay[][]>(() => {
    const events = (() => {
      try {
        return this.eventsResource.value() ?? [];
      } catch {
        return [];
      }
    })();

    const countsByDate = events
      .filter((e) => e.type === 'PushEvent')
      .reduce(
        (acc, e) => {
          const date = e.created_at.slice(0, 10);
          acc[date] = (acc[date] ?? 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    const today = new Date();
    const weeks: ContributionDay[][] = [];
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 363);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const maxCount = Math.max(1, ...Object.values(countsByDate));

    const current = new Date(startDate);
    while (current <= today) {
      const week: ContributionDay[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = current.toISOString().slice(0, 10);
        const count = countsByDate[dateStr] ?? 0;
        const ratio = count / maxCount;
        const level = (
          count === 0 ? 0 : ratio < 0.25 ? 1 : ratio < 0.5 ? 2 : ratio < 0.75 ? 3 : 4
        ) as 0 | 1 | 2 | 3 | 4;
        week.push({ date: dateStr, count, level });
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
    }

    return weeks;
  });

  readonly languageStats = computed(() => {
    const repos = this.repos();
    const counts = repos.reduce(
      (acc, repo) => {
        if (!repo.language) return acc;
        acc[repo.language] = (acc[repo.language] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return Object.entries(counts)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  });

  readonly totalStars = computed(() =>
    this.repos().reduce((acc, repo) => acc + repo.stargazers_count, 0),
  );

  searchUser(username: string): void {
    const trimmed = username.trim().toLowerCase();
    this.username.set(trimmed);

    const check = setInterval(() => {
      if (this.user()) {
        this.recentSearches.add(trimmed);
        clearInterval(check);
      }
      if (this.currentError()) {
        clearInterval(check);
      }
    }, 200);
  }
}

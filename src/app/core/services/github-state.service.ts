import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GithubApiService } from './github-api.service';
import { ErrorHandlerService } from './error-handler.service';
import { ApiError, GithubRepo, GithubUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GithubStateService {
  private readonly api = inject(GithubApiService);
  private readonly errorHandler = inject(ErrorHandlerService);

  readonly username = signal<string>('angular');

  readonly userResource = rxResource({
    params: () => this.username(),
    stream: ({ params: username }) => this.api.getUser(username),
  });

  readonly reposResource = rxResource({
    params: () => this.username(),
    stream: ({ params: username }) => this.api.getRepos(username),
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
    this.username.set(username.trim().toLowerCase());
  }
}

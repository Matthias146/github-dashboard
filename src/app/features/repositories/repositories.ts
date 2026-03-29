import { Component, computed, inject, signal } from '@angular/core';
import { GithubStateService } from '../../core/services';
import { DatePipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';

interface RepoFilterModel {
  search: string;
  minStars: string;
}

@Component({
  selector: 'app-repositories',
  imports: [DatePipe, FormField],
  templateUrl: './repositories.html',
  styleUrl: './repositories.scss',
})
export class Repositories {
  protected readonly state = inject(GithubStateService);

  readonly activeLanguage = signal<string | null>(null);

  protected readonly filterModel = signal<RepoFilterModel>({
    search: '',
    minStars: '0',
  });

  protected readonly repoFilter = form(this.filterModel);

  readonly availableLanguages = computed(() => {
    const repos = this.state.repos();
    const languages = repos.map((r) => r.language).filter((l): l is string => l !== null);
    return [...new Set(languages)];
  });

  readonly filteredRepos = computed(() => {
    const repos = this.state.repos();
    const lang = this.activeLanguage();
    const search = this.filterModel().search.toLowerCase();
    const minStars = Number(this.filterModel().minStars);

    return repos
      .filter((r) => !lang || r.language === lang)
      .filter(
        (r) =>
          !search ||
          r.name.toLowerCase().includes(search) ||
          r.description?.toLowerCase().includes(search),
      )
      .filter((r) => r.stargazers_count >= minStars);
  });

  setLanguageFilter(lang: string | null): void {
    this.activeLanguage.set(lang);
  }

  getLangVar(language: string | null): string {
    if (!language) return 'var(--lang-other)';
    return `var(--lang-${language.toLowerCase()}, var(--lang-other))`;
  }

  openRepo(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

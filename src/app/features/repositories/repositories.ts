import { Component, computed, inject, signal } from '@angular/core';
import { GithubStateService } from '../../core/services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repositories',
  imports: [DatePipe],
  templateUrl: './repositories.html',
  styleUrl: './repositories.scss',
})
export class Repositories {
  protected readonly state = inject(GithubStateService);

  readonly activeLanguage = signal<string | null>(null);

  readonly availableLanguages = computed(() => {
    const repos = this.state.reposResource.value() ?? [];
    const languages = repos.map((r) => r.language).filter((l): l is string => l !== null);
    return [...new Set(languages)];
  });

  readonly filteredRepos = computed(() => {
    const repos = this.state.reposResource.value() ?? [];
    const lang = this.activeLanguage();
    return lang ? repos.filter((r) => r.language === lang) : repos;
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

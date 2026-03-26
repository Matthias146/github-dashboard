import { Component, inject } from '@angular/core';
import { GithubStateService } from '../../core/services';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  protected readonly state = inject(GithubStateService);

  getLangVar(language: string): string {
    return `var(--lang-${language.toLowerCase()}, var(--lang-other))`;
  }
}

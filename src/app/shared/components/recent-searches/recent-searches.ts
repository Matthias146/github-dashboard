import { Component, inject, output, signal } from '@angular/core';
import { RecentSearchesService } from '../../../core/services';

@Component({
  selector: 'app-recent-searches',
  imports: [],
  templateUrl: './recent-searches.html',
  styleUrl: './recent-searches.scss',
})
export class RecentSearches {
  protected readonly service = inject(RecentSearchesService);
  protected readonly isOpen = signal(false);

  readonly selected = output<string>();

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  select(username: string): void {
    this.selected.emit(username);
    this.isOpen.set(false);
  }

  remove(event: Event, username: string): void {
    event.stopPropagation();
    this.service.remove(username);
  }

  clear(): void {
    this.service.clear();
    this.isOpen.set(false);
  }
}

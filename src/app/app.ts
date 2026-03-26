import { Component, inject } from '@angular/core';
import { GithubStateService } from './core/services';
import { Profile } from './features/profile/profile';
import { Repositories } from './features/repositories/repositories';
import { Stats } from './features/stats/stats';

@Component({
  selector: 'app-root',
  imports: [Profile, Repositories, Stats],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly state = inject(GithubStateService);

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.trim()) {
      this.state.searchUser(input.value);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch(event);
    }
  }
}

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GithubStateService } from './core/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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

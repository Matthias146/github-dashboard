import { Component, inject } from '@angular/core';
import { GithubStateService } from '../../core/services';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly state = inject(GithubStateService);
}

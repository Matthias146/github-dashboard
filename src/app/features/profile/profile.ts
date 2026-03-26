import { Component, inject } from '@angular/core';
import { GithubStateService } from '../../core/services';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NgOptimizedImage],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly state = inject(GithubStateService);
}

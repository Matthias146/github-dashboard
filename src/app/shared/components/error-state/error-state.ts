import { Component, input } from '@angular/core';
import { ApiError } from '../../../core/models';

@Component({
  selector: 'app-error-state',
  imports: [],
  templateUrl: './error-state.html',
  styleUrl: './error-state.scss',
})
export class ErrorState {
  error = input.required<ApiError>();
}

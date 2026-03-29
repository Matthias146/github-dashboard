import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  label = input.required<string>();
  value = input.required<string | number>();
  sub = input<string>();
  accent = input<'green' | 'blue' | 'amber' | 'default'>('default');
}

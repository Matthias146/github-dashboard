import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RateLimitService {
  private readonly remaining = signal<number | null>(null);
  private readonly limit = signal<number | null>(null);

  readonly display = computed(() => {
    const r = this.remaining();
    const l = this.limit();
    if (r === null || l === null) return null;
    return { remaining: r, limit: l };
  });

  readonly isLow = computed(() => {
    const r = this.remaining();
    const l = this.limit();
    if (r === null || l === null) return false;
    return r / l < 0.2;
  });

  update(remaining: number, limit: number): void {
    this.remaining.set(remaining);
    this.limit.set(limit);
  }
}

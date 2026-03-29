import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { RateLimitService } from '../services';
import { tap } from 'rxjs';

export const rateLimitInterceptor: HttpInterceptorFn = (req, next) => {
  const rateLimitService = inject(RateLimitService);

  return next(req).pipe(
    tap((event) => {
      if (event.type === 4) {
        const remaining = event.headers.get('x-ratelimit-remaining');
        const limit = event.headers.get('x-ratelimit-limit');

        if (remaining !== null && limit !== null) {
          rateLimitService.update(Number(remaining), Number(limit));
        }
      }
    }),
  );
};

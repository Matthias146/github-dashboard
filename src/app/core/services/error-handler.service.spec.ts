import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should handle 404 as not_found', () => {
    const err = new HttpErrorResponse({ status: 404 });
    const result = service.handle(err);
    expect(result.type).toBe('not_found');
    expect(result.statusCode).toBe(404);
  });

  it('should handle 429 as rate_limit', () => {
    const err = new HttpErrorResponse({ status: 429 });
    const result = service.handle(err);
    expect(result.type).toBe('rate_limit');
  });

  it('should handle 403 as forbidden', () => {
    const err = new HttpErrorResponse({ status: 403 });
    const result = service.handle(err);
    expect(result.type).toBe('forbidden');
  });

  it('should handle unknown errors', () => {
    const result = service.handle(new Error('unknown'));
    expect(result.type).toBe('unknown');
  });
});

import { TestBed } from '@angular/core/testing';
import { RateLimitService } from './rate-limit.service';

describe('RateLimitService', () => {
  let service: RateLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateLimitService);
  });

  it('should start with null display', () => {
    expect(service.display()).toBeNull();
  });

  it('should update display after update()', () => {
    service.update(50, 60);
    expect(service.display()).toEqual({ remaining: 50, limit: 60 });
  });

  it('should set isLow to false when remaining is high', () => {
    service.update(50, 60);
    expect(service.isLow()).toBe(false);
  });

  it('should set isLow to true when below 20%', () => {
    service.update(10, 60);
    expect(service.isLow()).toBe(true);
  });
});

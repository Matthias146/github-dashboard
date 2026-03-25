import { TestBed } from '@angular/core/testing';

import { GithubStateService } from './github-state.service';

describe('GithubStateService', () => {
  let service: GithubStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

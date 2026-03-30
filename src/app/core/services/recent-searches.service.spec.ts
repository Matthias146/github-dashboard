import { TestBed } from '@angular/core/testing';
import { RecentSearchesService } from './recent-searches.service';

describe('RecentSearchesService', () => {
  let service: RecentSearchesService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentSearchesService);
  });

  it('should start empty', () => {
    expect(service.recentSearches()).toEqual([]);
  });

  it('should add a search', () => {
    service.add('angular');
    expect(service.recentSearches()).toContain('angular');
  });

  it('should not duplicate entries', () => {
    service.add('angular');
    service.add('angular');
    expect(service.recentSearches().length).toBe(1);
  });

  it('should keep max 5 entries', () => {
    ['a', 'b', 'c', 'd', 'e', 'f'].forEach((u) => service.add(u));
    expect(service.recentSearches().length).toBe(5);
  });

  it('should remove a specific entry', () => {
    service.add('angular');
    service.add('react');
    service.remove('angular');
    expect(service.recentSearches()).not.toContain('angular');
    expect(service.recentSearches()).toContain('react');
  });

  it('should clear all entries', () => {
    service.add('angular');
    service.add('react');
    service.clear();
    expect(service.recentSearches()).toEqual([]);
  });

  it('should persist to localStorage', () => {
    service.add('angular');
    const stored = JSON.parse(localStorage.getItem('gh-explorer-recent') ?? '[]');
    expect(stored).toContain('angular');
  });
});

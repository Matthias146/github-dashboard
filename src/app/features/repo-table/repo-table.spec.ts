import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoTable } from './repo-table';

describe('RepoTable', () => {
  let component: RepoTable;
  let fixture: ComponentFixture<RepoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

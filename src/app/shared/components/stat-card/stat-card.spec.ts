import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCard } from './stat-card';
import { Component } from '@angular/core';

@Component({
  template: `<app-stat-card label="Repos" [value]="42" />`,
  imports: [StatCard],
  standalone: true,
})
class StatCardHostComponent {}

describe('StatCard', () => {
  let fixture: ComponentFixture<StatCardHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StatCardHostComponent);
    await fixture.whenStable();
  });

  it('should render label and value', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.stat-card__label')?.textContent).toContain('Repos');
    expect(el.querySelector('.stat-card__value')?.textContent).toContain('42');
  });

  it('should apply accent class', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.stat-card--default')).toBeTruthy();
  });
});

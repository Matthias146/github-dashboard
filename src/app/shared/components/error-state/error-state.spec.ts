import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorState } from './error-state';
import { Component } from '@angular/core';
import { ApiError } from '../../../core/models';

const mockError: ApiError = {
  type: 'not_found',
  message: 'Dieser GitHub-User wurde nicht gefunden.',
  statusCode: 404,
};

@Component({
  template: `<app-error-state [error]="error" />`,
  imports: [ErrorState],
  standalone: true,
})
class ErrorStateHostComponent {
  error = mockError;
}

describe('ErrorState', () => {
  let fixture: ComponentFixture<ErrorStateHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorStateHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ErrorStateHostComponent);
    await fixture.whenStable();
  });

  it('should render error message', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.error-state__message')?.textContent).toContain(
      'Dieser GitHub-User wurde nicht gefunden.',
    );
  });

  it('should render status code', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.error-state__code')?.textContent).toContain('404');
  });

  it('should apply not_found class', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.error-state--not_found')).toBeTruthy();
  });
});

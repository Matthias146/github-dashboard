import { Component, inject } from '@angular/core';
import { GithubStateService } from '../../core/services';

@Component({
  selector: 'app-contribution-graph',
  imports: [],
  templateUrl: './contribution-graph.html',
  styleUrl: './contribution-graph.scss',
})
export class ContributionGraph {
  protected readonly state = inject(GithubStateService);

  readonly levelColors: Record<number, string> = {
    0: 'var(--contrib-0)',
    1: 'var(--contrib-1)',
    2: 'var(--contrib-2)',
    3: 'var(--contrib-3)',
    4: 'var(--contrib-4)',
  };

  readonly months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  getMonthLabel(weekIndex: number): string | null {
    const weeks = this.state.contributionGrid();
    if (!weeks[weekIndex]?.[0]) return null;
    const date = new Date(weeks[weekIndex][0].date);
    if (date.getDate() <= 7) {
      return this.months[date.getMonth()];
    }
    return null;
  }

  readonly totalContributions = () => {
    const weeks = this.state.contributionGrid();
    return weeks.flat().reduce((acc, d) => acc + d.count, 0);
  };
}

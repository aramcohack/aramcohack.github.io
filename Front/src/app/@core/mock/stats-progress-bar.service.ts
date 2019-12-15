import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { ProgressInfo, StatsProgressBarData } from '../data/stats-progress-bar';

@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'Today logs processed',
      value: 572900,
      activeProgress: 70,
      description: 'Better than last week (5%)',
    },
    {
      title: 'Actions',
      value: 6378,
      activeProgress: 30,
      description: 'Better than last week (30%)',
    },
    {
      title: 'New warnings',
      value: 4,
      activeProgress: 55,
      description: 'Low priority - 3, Medium - 1',
    },
  ];

  getProgressInfoData(): Observable<ProgressInfo[]> {
    return observableOf(this.progressInfoData);
  }
}

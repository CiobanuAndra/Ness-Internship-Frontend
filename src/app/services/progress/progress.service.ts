import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LastDaysProgress } from 'src/app/enums/last-days-progress';
import { ProgressStatus } from 'src/app/enums/progress-status';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  constructor() {}

  dataForLast7Days = [
    [ProgressStatus.Register, 10],
    [ProgressStatus.Finished, 80],
    [ProgressStatus.InProgress, 5],
    [ProgressStatus.NotStarted, 5],
  ];

  dataForLast14Days = [
    [ProgressStatus.Register, 15],
    [ProgressStatus.Finished, 30],
    [ProgressStatus.InProgress, 10],
    [ProgressStatus.NotStarted, 45],
  ];

  dataForLast21Days = [
    [ProgressStatus.Register, 1],
    [ProgressStatus.Finished, 2],
    [ProgressStatus.InProgress, 90],
    [ProgressStatus.NotStarted, 7],
  ];

  dataForLast30Days = [
    [ProgressStatus.Register, 25],
    [ProgressStatus.Finished, 25],
    [ProgressStatus.InProgress, 25],
    [ProgressStatus.NotStarted, 25],
  ];

  getDataForSelectedLastDays(
    selectedLastDays: LastDaysProgress
  ): Observable<any> {
    switch (selectedLastDays) {
      case LastDaysProgress.SevenDays:
        return of(this.dataForLast7Days);
      case LastDaysProgress.FourteenDays:
        return of(this.dataForLast14Days);
      case LastDaysProgress.TwentyOneDays:
        return of(this.dataForLast21Days);
      case LastDaysProgress.ThirtyDays:
        return of(this.dataForLast30Days);
      default:
        return of([]);
    }
  }
}

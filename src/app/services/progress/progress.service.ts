import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LastDaysProgress } from 'src/app/enums/last-days-progress';
import { ProgressStatus } from 'src/app/enums/progress-status';
@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  constructor() {}

  categoryColors: { [category: string]: string } = {
    [ProgressStatus.Register]: '#00195f',
    [ProgressStatus.Finished]: '#149211',
    [ProgressStatus.InProgress]: '#C1BA00',
    [ProgressStatus.NotStarted]: '#CCD1DF',
  };

  dataForLast7Days: [string, number][] = [
    ['Register', 10],
    ['Finished', 80],
    ['InProgress', 5],
    ['NotStarted', 5],
  ];

  dataForLast14Days: [string, number][] = [
    ['Register', 15],
    ['Finished', 30],
    ['InProgress', 10],
    ['NotStarted', 45],
  ];

  dataForLast21Days: [string, number][] = [
    ['Register', 1],
    ['Finished', 2],
    ['InProgress', 90],
    ['NotStarted', 7],
  ];

  dataForLast30Days: [string, number][] = [
    ['Register', 25],
    ['Finished', 25],
    ['InProgress', 25],
    ['NotStarted', 25],
  ];

  getChartDataForLastDays(
    selectedLastDays: LastDaysProgress
  ): Observable<[string, number, string][]> {
    let data: [string, number, string][];

    switch (selectedLastDays) {
      case LastDaysProgress.SevenDays:
        data = this.dataForLast7Days.map(([category, value]) => [
          category,
          value,
          this.categoryColors[category],
        ]);
        console.log(data);
        break;
      case LastDaysProgress.FourteenDays:
        data = this.dataForLast14Days.map(([category, value]) => [
          category,
          value,
          this.categoryColors[category],
        ]);
        break;
      case LastDaysProgress.TwentyOneDays:
        data = this.dataForLast21Days.map(([category, value]) => [
          category,
          value,
          this.categoryColors[category],
        ]);
        break;
      case LastDaysProgress.ThirtyDays:
        data = this.dataForLast30Days.map(([category, value]) => [
          category,
          value,
          this.categoryColors[category],
        ]);
        break;
      default:
        data = [];
    }

    return of(data);
  }
}

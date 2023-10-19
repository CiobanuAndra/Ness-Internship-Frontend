import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
declare var google: any;
import { LastDaysProgress } from 'src/app/enums/last-days-progress';
import { ProgressService } from 'src/app/services/progress/progress.service';

@Component({
  selector: 'app-current-progress',
  templateUrl: './current-progress.component.html',
  styleUrls: ['./current-progress.component.scss'],
})
export class CurrentProgressComponent implements OnInit {
  constructor(private progress: ProgressService) {}
  selectedLastDays: LastDaysProgress = LastDaysProgress.SevenDays;
  currentHoverValue: string = '';
  chartData: any = [];

  lastDays = Object.values(LastDaysProgress).filter(
    (value) => typeof value === 'number'
  );

  legendItems = [
    { name: 'Register', color: '#00195f' },
    { name: 'Finished', color: '#149211' },
    { name: 'In Progress', color: '#C1BA00' },
    { name: 'Not Started', color: '#CCD1DF' },
  ];

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart());

    this.progress
      .getDataForSelectedLastDays(this.selectedLastDays)
      .subscribe((values) => {
        values.unshift(['', '']);
        this.chartData = values;
        this.drawChart();
        this.currentHoverValue = '';
      });
  }

  updateChart(): void {
    this.progress
      .getDataForSelectedLastDays(this.selectedLastDays)
      .subscribe((values) => {
        values.unshift(['', '']);
        this.chartData = values;
        this.drawChart();
        this.currentHoverValue = '';
      });
  }

  drawChart(): void {
    if (
      typeof google !== 'undefined' &&
      typeof google.visualization !== 'undefined'
    ) {
      var data = google.visualization.arrayToDataTable(this.chartData);

      var options = {
        pieHole: 0.78,
        colors: ['#00195f', '#149211', '#C1BA00', '#CCD1DF'],
        legend: 'none',
        pieSliceText: 'none',
        tooltip: { trigger: 'none' },
      };

      var chart = new google.visualization.PieChart(
        document.getElementById('donutchart')
      );

      google.visualization.events.addListener(
        chart,
        'onmouseover',
        (eventData: { row: any }) => {
          var sliceIndex = eventData.row;
          var sliceValue = data.getValue(sliceIndex, 1);
          this.currentHoverValue = `${sliceValue}%`;
        }
      );

      chart.draw(data, options);
    }
  }
}

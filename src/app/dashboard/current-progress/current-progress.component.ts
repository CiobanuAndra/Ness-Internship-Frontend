import { Component, OnInit } from '@angular/core';
declare var google: any;
import { LastDaysProgress } from 'src/app/enums/last-days-progress';
import { ProgressService } from 'src/app/services/progress/progress.service';

@Component({
  selector: 'app-current-progress',
  templateUrl: './current-progress.component.html',
  styleUrls: ['./current-progress.component.scss'],
})
export class CurrentProgressComponent implements OnInit {
  constructor(private _progress: ProgressService) {}
  selectedLastDays: LastDaysProgress = LastDaysProgress.SevenDays;
  currentHoverValue: string = '';
  chartData: any = [];

  lastDays = Object.values(LastDaysProgress).filter(
    (value) => typeof value === 'number'
  );

  legendItems = [
    { name: 'Register', color: '#00195f' },
    { name: 'Finished', color: '#8D96B6' },
    { name: 'In Progress', color: '#149211' },
    { name: 'Not Started', color: '#CCD1DF' },
  ];

  ngOnInit(): void {
    this._progress.getDataForLast7Days().subscribe((values) => {
      values.unshift(['', '']);
      this.chartData = values;
    });

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart());
  }

  updateChart() {
    this._progress
      .getDataForSelectedLastDays(this.selectedLastDays)
      .subscribe((values) => {
        values.unshift(['', '']);
        this.chartData = values;
        this.drawChart();
        this.currentHoverValue = '';
      });
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable(this.chartData);

    var options = {
      pieHole: 0.78,
      colors: ['#00195f', '#8D96B6', '#149211', '#CCD1DF'],
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

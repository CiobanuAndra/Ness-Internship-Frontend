import { Component, OnInit } from '@angular/core';
import { LastDaysProgress } from 'src/app/enums/last-days-progress';
import { ProgressService } from 'src/app/services/progress/progress.service';

@Component({
  selector: 'app-current-progress',
  templateUrl: './current-progress.component.html',
  styleUrls: ['./current-progress.component.scss'],
})
export class CurrentProgressComponent implements OnInit {
  selectedLastDays: LastDaysProgress = LastDaysProgress.SevenDays;
  currentHoverValue: string = '';
  chartData: [string, number, string][] = [];
  lastDays = Object.values(LastDaysProgress).filter(
    (value) => typeof value === 'number'
  );
  legendItems = [
    { name: 'Register', color: '#00195f' },
    { name: 'Finished', color: '#149211' },
    { name: 'In Progress', color: '#C1BA00' },
    { name: 'Not Started', color: '#CCD1DF' },
  ];

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart());

    this.progressService
      .getChartDataForLastDays(this.selectedLastDays)
      .subscribe((values) => {
        this.chartData = values;
        this.drawChart();
        this.currentHoverValue = '';
      });
  }

  updateChart(): void {
    this.progressService
      .getChartDataForLastDays(this.selectedLastDays)
      .subscribe((values) => {
        this.chartData = values;
        this.drawChart();
        this.currentHoverValue = '';
      });
  }

  drawChart(): void {
    const chartContainer = document.getElementById('donutchart');
    if (chartContainer) {
      if (
        typeof google !== 'undefined' &&
        typeof google.visualization !== 'undefined'
      ) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Category');
        data.addColumn('number', 'Value');
        data.addColumn({ type: 'string', role: 'style' });
        data.addRows(this.chartData);

        var options: google.visualization.PieChartOptions = {
          pieHole: 0.78,
          colors: this.chartData.map(([, , color]) => color),
          legend: 'none',
          pieSliceText: 'none',
          tooltip: { trigger: 'none' },
        };

        var chart = new google.visualization.PieChart(chartContainer);

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
}

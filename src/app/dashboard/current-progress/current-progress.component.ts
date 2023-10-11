import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-current-progress',
  templateUrl: './current-progress.component.html',
  styleUrls: ['./current-progress.component.scss'],
})
export class CurrentProgressComponent implements OnInit {
  selectedLastDays: string = '';
  currentHoverValue: string = '';
  chartData: any = [];

  lastDays: string[] = [
    'Last 7 Days',
    'Last 14 Days',
    'Last 21 Days',
    'Last 30 Days',
  ];

  legendItems = [
    { name: 'Register', color: '#00195f' },
    { name: 'Finished', color: '#8D96B6' },
    { name: 'In Progress', color: '#149211' },
    { name: 'Not Started', color: '#CCD1DF' },
  ];

  dataForLast7Days = [
    ['Task', 'Hours per Day'],
    ['Register', 10],
    ['Finished', 80],
    ['In Progress', 5],
    ['Not Started', 5],
  ];

  dataForLast14Days = [
    ['Task', 'Hours per Day'],
    ['Register', 15],
    ['Finished', 30],
    ['In Progress', 10],
    ['Not Started', 45],
  ];

  dataForLast21Days = [
    ['Task', 'Hours per Day'],
    ['Register', 1],
    ['Finished', 2],
    ['In Progress', 90],
    ['Not Started', 7],
  ];

  dataForLast30Days = [
    ['Task', 'Hours per Day'],
    ['Register', 25],
    ['Finished', 25],
    ['In Progress', 25],
    ['Not Started', 25],
  ];

  dataFor0Days = [['Task', 'Hours per Day']];

  ngOnInit(): void {
    this.chartData = this.dataForLast7Days;
    this.selectedLastDays = this.lastDays[0];
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart());
  }
  updateChart() {
    if (this.selectedLastDays === 'Last 7 Days') {
      this.chartData = this.dataForLast7Days;
    } else if (this.selectedLastDays === 'Last 14 Days') {
      this.chartData = this.dataForLast14Days;
    } else if (this.selectedLastDays === 'Last 21 Days') {
      this.chartData = this.dataForLast21Days;
    } else if (this.selectedLastDays === 'Last 30 Days') {
      this.chartData = this.dataForLast30Days;
    } else {
      this.chartData = [];
    }
    this.drawChart();
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

    google.visualization.events.addListener(chart, 'onmouseout', () => {});
    chart.draw(data, options);
  }
}

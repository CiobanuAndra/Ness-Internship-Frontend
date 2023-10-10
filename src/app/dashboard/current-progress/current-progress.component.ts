import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-current-progress',
  templateUrl: './current-progress.component.html',
  styleUrls: ['./current-progress.component.scss'],
})
export class CurrentProgressComponent implements OnInit {
  lastDays: string[] = [
    'Last 7 Days',
    'Last 14 Days',
    'Last 21 Days',
    'Last 30 Days',
  ];
  selectedLastDays: string = '';

  legendItems = [
    { name: 'Register', color: '#00195f' },
    { name: 'Finished', color: '#8D96B6' },
    { name: 'In Progress', color: '#149211' },
    { name: 'Not Started', color: '#CCD1DF' },
  ];

  currentHoverValue: string = '';

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart());
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Register', 17],
      ['Finished', 3],
      ['In Progress', 10],
      ['Not Started', 70],
    ]);

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

        console.log(this.currentHoverValue);
      }
    );
    google.visualization.events.addListener(chart, 'onmouseout', () => {});
    chart.draw(data, options);
  }
}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-current-progress',
  templateUrl: './current-progress.component.html',
  styleUrls: ['./current-progress.component.scss'],
})
export class CurrentProgressComponent implements OnInit {
  registerColor = '#00195f';
  finishedColor = '#8D96B6';
  inProgressColor = '#149211';
  notStartedColor = '#CCD1DF';

  legendItems = [
    { name: 'Register', color: '#00195f' },
    { name: 'Finished', color: '#8D96B6' },
    { name: 'In Progress', color: '#149211' },
    { name: 'Not Started', color: '#CCD1DF' },
  ];

  progressSubject = new BehaviorSubject<number>(25);

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Register', 1],
      ['Finished', 1],
      ['In Progress', 1],
      ['Not Started', 1],
    ]);

    var options = {
      pieHole: 0.78,
      colors: ['#00195f', '#8D96B6', '#149211', '#CCD1DF'],
      legend: 'none',
      pieSliceText: 'none',
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }

  updateProgressValue(newValue: number) {
    this.progressSubject.next(newValue);
  }
}

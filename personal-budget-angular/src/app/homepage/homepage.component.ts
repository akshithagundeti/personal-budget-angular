import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
      datasets: [
          {
              data: new Array<any>(),
              backgroundColor: [
                "#FF5733",  // Red-Orange
                "#33FF57",  // Green
                "#3357FF",  // Blue
                "#F1C40F",  // Yellow
                "#9B59B6",  // Purple
                "#1ABC9C",  // Teal
                "#E74C3C"   // Red
              ]
          }
      ],
      labels: new Array<any>()
  };
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe( ( res: any )=>{
      console.log( res.myBudget );
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    } );
  }
  
  createChart(){
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
        if( typeof ctx !== 'undefined' ){
            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: this.dataSource
            });
        }
  }

}

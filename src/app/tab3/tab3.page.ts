import { Component } from '@angular/core';
declare var Chart;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})




export class Tab3Page {
  
  
  ngAfterViewInit() {
    var canvas : any = document.getElementById('myChart');
    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dia 1','Dia 2','Dia 3','Dia 4','Dia 5','Dia 6','Dia 7'],
            datasets: [{
                label: 'Healthy',
              
                data: [98,96,96,98,99,97,0],
                backgroundColor: 

                    'rgba(100, 50, 250, 0.2)',
                
                
                borderWidth: 1
            },
            {
              label: 'Hyperthyroidism',
              data: [0,0,0,0,0,0,97],
              backgroundColor: 
                  'rgba(255, 99, 132, 0.2)',

              
              
              borderWidth: 1
          }]
        },
        options: {
            scales: {
              xAxes: [{stacked:true}],

              
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                },{stacked:true}]
            }
        }
    });
}  

constructor() { }

}

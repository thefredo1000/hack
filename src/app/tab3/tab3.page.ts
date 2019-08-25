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
                label: 'Threshold', 
                

                data: [98,96,96,98,99,97,96],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}  

constructor() { }

}

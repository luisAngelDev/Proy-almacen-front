import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/_service/venta.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  
  pdfSrc: any;
  chart: any;
  tipo: string = 'bar';

  constructor(
    private ventaService: VentaService
  ){}

  ngOnInit(): void {
    this.dibujar();


  }

  cambiar(tipo: string){
    this.tipo = tipo;
    if(this.chart!= null){
      this.chart.destroy();
    }
    this.dibujar();
  }

  dibujar(){
    this.ventaService.listarResumen().subscribe(data => {
      let cantidades = data.map(x => x.cantidad);
      let fechas = data.map(x => x.fecha);


      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidades,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });

    });

  }

  verReporte(){
    this.ventaService.generarReporte().subscribe(data => {

      //this.pdfSrc = window.URL.createObjectURL(data);

      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
      reader.readAsArrayBuffer(data);
    });

  }

  descargarReporte(){
    this.ventaService.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf'
      a.click();
    } );
  }

}

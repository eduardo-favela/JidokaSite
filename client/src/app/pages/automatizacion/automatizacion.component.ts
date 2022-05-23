import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-automatizacion',
  templateUrl: './automatizacion.component.html',
  styleUrls: ['./automatizacion.component.css']
})
export class AutomatizacionComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  automText: any = {};
  automTextRes: any = [];

  imagesAutom: any = [
    { name: '../../../assets/img/automatizacion/autom1.png', desc: 'Consultoría' },
    { name: '../../../assets/img/automatizacion/autom2.png', desc: 'Control de movimiento' },
    { name: '../../../assets/img/automatizacion/autom3.jpg', desc: 'Control de rechazo' },
    { name: '../../../assets/img/automatizacion/autom4.png', desc: 'Control y potencia' },
    { name: '../../../assets/img/automatizacion/autom5.png', desc: 'Elaboración de diagramas de alambrado' },
    { name: '../../../assets/img/automatizacion/autom6.png', desc: 'HMI' },
    { name: '../../../assets/img/automatizacion/autom7.jpg', desc: 'Ingeniería eléctrica' },
    { name: '../../../assets/img/automatizacion/autom8.jpg', desc: 'Instalación de equipos' },
    { name: '../../../assets/img/automatizacion/autom9.png', desc: 'Inyección de plástico' },
    { name: '../../../assets/img/automatizacion/autom10.png', desc: 'Mantenimiento' },
    { name: '../../../assets/img/automatizacion/autom11.jpg', desc: 'Pasteurización' },
    { name: '../../../assets/img/automatizacion/autom12.jpg', desc: 'Pesaje industrial' },
    { name: '../../../assets/img/automatizacion/autom13.png', desc: 'PLC' },
    { name: '../../../assets/img/automatizacion/autom14.png', desc: 'Sistema SCADA' },
    { name: '../../../assets/img/automatizacion/autom15.png', desc: 'Sistema de llenado' },
    { name: '../../../assets/img/automatizacion/autom16.png', desc: 'Sistema de envasado' },
    { name: '../../../assets/img/automatizacion/autom17.png', desc: 'Sistema de seguridad' },
    { name: '../../../assets/img/automatizacion/autom18.png', desc: 'Sistema de transporte' },
    { name: '../../../assets/img/automatizacion/autom19.jpg', desc: 'Supervisión de instalaciones' },
    { name: '../../../assets/img/automatizacion/autom20.jpg', desc: 'Telemetría' },
    { name: '../../../assets/img/automatizacion/autom21.jpg', desc: 'Variador de velocidad' },
    { name: '../../../assets/img/automatizacion/autom22.png', desc: 'Sistema vision' },
  ];
  ngOnInit(): void {
    this.getAutomText()
  }
  getAutomText() {
    this.adminService.getAutomText({ seccion: 'automatizacion' }).subscribe(
      res => {
        if (res) {
          this.automTextRes = res
          this.automText = { ...this.automTextRes[0] }
        }
      },
      err => {
        console.error(err)
      }
    )
  }
}

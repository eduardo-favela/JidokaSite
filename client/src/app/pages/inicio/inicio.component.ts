import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  images: any = [
    {
      url: 'https://sp-ao.shortpixel.ai/client/q_lossy,ret_img,w_2048/https://www.ecomasteryproject.com/wp-content/uploads/2020/06/focused-young-professional-engineer-installing-solar-panel-4254164-2048x1365.jpg',
      header: 'First slide label',
      text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
      url: 'https://everbluetraining.com/sites/default/files/solar-inspection-small.png',
      header: 'Second slide label',
      text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
      url: 'https://www.ecowatch.com/wp-content/uploads/2022/04/GettyImages-1316382948-1-scaled.jpg',
      header: 'Third slide label',
      text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}

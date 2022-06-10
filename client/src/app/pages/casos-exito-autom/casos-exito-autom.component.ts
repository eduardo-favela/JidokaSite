import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-casos-exito-autom',
  templateUrl: './casos-exito-autom.component.html',
  styleUrls: ['./casos-exito-autom.component.css']
})
export class CasosExitoAutomComponent implements OnInit {

  casosExito: any = [];

  constructor(private adminService: AdminService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getCasosExito()
  }

  getCasosExito() {
    this.adminService.getCasosExitoAutom().subscribe(
      res => {
        this.casosExito = res
        this.casosExito.forEach((slider: any) => {
          slider.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + slider.img);
        });
      },
      err => console.error(err)
    )
  }
}

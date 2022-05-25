import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-colector-solar',
  templateUrl: './colector-solar.component.html',
  styleUrls: ['./colector-solar.component.css']
})
export class ColectorSolarComponent implements OnInit {

  card: any = {}

  @Output() scrollEvent = new EventEmitter<string>();

  scroll(value: string) {
    this.scrollEvent.emit(value);
  }

  constructor(private adminService: AdminService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.adminService.getCards({ tipo: 1, producto: 4 }).subscribe(
      res => {
        this.card = res
        this.card.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.card.img);
      },
      err => {
        console.error(err)
      }
    )
  }
}

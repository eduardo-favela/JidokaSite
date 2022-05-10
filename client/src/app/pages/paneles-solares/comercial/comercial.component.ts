import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css']
})
export class ComercialComponent implements OnInit {

  card: any = {}

  constructor(private adminService: AdminService, private _sanitizer: DomSanitizer) { }

  @Output() scrollEvent = new EventEmitter<string>();

  scroll(value: string) {
    this.scrollEvent.emit(value);
  }

  ngOnInit(): void {
    this.adminService.getCards({ tipo: 2, producto: 1 }).subscribe(
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

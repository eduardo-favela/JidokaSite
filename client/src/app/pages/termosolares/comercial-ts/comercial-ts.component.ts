import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comercial-ts',
  templateUrl: './comercial-ts.component.html',
  styleUrls: ['./comercial-ts.component.css']
})
export class ComercialTsComponent implements OnInit {

  card: any = {}

  @Output() scrollEvent = new EventEmitter<string>();

  scroll(value: string) {
    this.scrollEvent.emit(value);
  }

  constructor(private adminService: AdminService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.adminService.getCards({ tipo: 2, producto: 2 }).subscribe(
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

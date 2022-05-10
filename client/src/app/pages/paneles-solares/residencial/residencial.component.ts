import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-residencial',
  templateUrl: './residencial.component.html',
  styleUrls: ['./residencial.component.css']
})
export class ResidencialComponent implements OnInit {

  card: any = {}

  constructor(private adminService: AdminService, private _sanitizer: DomSanitizer) { }

  @Output() scrollEvent = new EventEmitter<string>();

  scroll(value: string) {
    this.scrollEvent.emit(value);
  }

  ngOnInit(): void {
    this.adminService.getCards({ tipo: 1, producto: 1 }).subscribe(
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

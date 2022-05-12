import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  faTemperatureHalf, faGears, faAddressCard,
  faSolarPanel,
  faCode,
  faCheckToSlot,
  faFilm
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  solarIcon = faSolarPanel;
  termosolarIcon = faTemperatureHalf;
  automationIcon = faGears;
  contactIcon = faAddressCard;
  adminIcon = faCode;
  emailIcon = faEnvelope;
  phoneIcon = faPhone;
  casosIcon = faCheckToSlot;
  videoIcon = faFilm;

  constructor(private router: Router, private location: Location) { }

  @Output() scrollEvent = new EventEmitter<string>();

  scroll(value: string) {
    this.scrollEvent.emit(value);
  }

  ngOnInit(): void {
  }

  public sessionStorage = sessionStorage;

  cerrarSesion() {
    sessionStorage.clear();
  }
}

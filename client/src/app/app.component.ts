import { Component } from '@angular/core';
import { faAdd, faSolarPanel } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'
import { faGears } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jidokaSite';

  solarIcon = faSolarPanel;
  termosolarIcon= faTemperatureHalf;
  automationIcon= faGears;
  contactIcon= faAddressCard;
}

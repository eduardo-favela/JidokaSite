import { Component } from '@angular/core';
import {
  faTemperatureHalf, faGears, faAddressCard,
  faSolarPanel,
  faCode
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jidokaSite';
  solarIcon = faSolarPanel;
  termosolarIcon = faTemperatureHalf;
  automationIcon = faGears;
  contactIcon = faAddressCard;
  adminIcon = faCode;

  public sessionStorage = sessionStorage;

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewInit() {
    window.addEventListener("scroll", () => {
      let reveals = document.querySelectorAll(".reveal");

      for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    });
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  faTemperatureHalf, faGears, faAddressCard,
  faSolarPanel,
  faCode,
  faExclamationCircle,
  faCheckCircle,
  faBan
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

import { ReCaptchaService } from 'angular-recaptcha3';
import { ContactoService } from 'src/app/services/contacto.service';
import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  images: any = []

  solarIcon = faSolarPanel;
  termosolarIcon = faTemperatureHalf;
  automationIcon = faGears;
  contactIcon = faAddressCard;
  adminIcon = faCode;
  emailIcon = faEnvelope;
  phoneIcon = faPhone;

  modalIcon = faBan;
  loadingForm = false;

  contact: any = {
    nombre: null,
    telefono: null,
    correo: null,
    mensaje: null
  }

  constructor(private recaptchaService: ReCaptchaService, private contactoService: ContactoService,
    private adminService: AdminService, private cdRef: ChangeDetectorRef, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getSliderImgs()
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
    this.cdRef.detectChanges();
  }
  onCaptchaResponse(e: any) {

  }

  checkInput(input: string) {
    let valid = true;
    switch (input) {
      case 'nombre':
        if (this.contact.nombre) {
          $('#nombreInput').addClass('is-valid')
          $('#nombreInput').removeClass('is-invalid')
        }
        else {
          $('#nombreInput').addClass('is-invalid')
          $('#nombreInput').removeClass('is-valid')
          valid = false
        }
        break;
      case 'correo':
        if (this.contact.correo) {
          if (this.contact.correo.toString().includes('@') && this.contact.correo.toString().includes('.com')) {
            $('#correoInput').addClass('is-valid')
            $('#correoInput').removeClass('is-invalid')
          }
          else {
            $('#correoInput').addClass('is-invalid')
            $('#correoInput').removeClass('is-valid')
            valid = false
          }
        }
        else {
          $('#correoInput').addClass('is-invalid')
          $('#correoInput').removeClass('is-valid')
          valid = false
        }
        break;
      case 'telefono':
        if (this.contact.telefono) {
          if (this.contact.telefono.toString().length == 10) {
            $('#telInput').addClass('is-valid')
            $('#telInput').removeClass('is-invalid')
          }
          else {
            $('#telInput').addClass('is-invalid')
            $('#telInput').removeClass('is-valid')
            valid = false
          }
        }
        else {
          $('#telInput').addClass('is-invalid')
          $('#telInput').removeClass('is-valid')
          valid = false
        }
        break;
      case 'mensaje':
        if (this.contact.mensaje) {
          $('#floatingTextarea').addClass('is-valid')
          $('#floatingTextarea').removeClass('is-invalid')
        }
        else {
          $('#floatingTextarea').addClass('is-invalid')
          $('#floatingTextarea').removeClass('is-valid')
          valid = false
        }
        break;

      default:
        if (this.contact.nombre) {
          $('#nombreInput').addClass('is-valid')
          $('#nombreInput').removeClass('is-invalid')
        }
        else {
          $('#nombreInput').addClass('is-invalid')
          $('#nombreInput').removeClass('is-valid')
          valid = false
        }
        if (this.contact.correo) {
          if (this.contact.correo.toString().includes('@') && this.contact.correo.toString().includes('.com')) {
            $('#correoInput').addClass('is-valid')
            $('#correoInput').removeClass('is-invalid')
          }
          else {
            $('#correoInput').addClass('is-invalid')
            $('#correoInput').removeClass('is-valid')
            valid = false
          }
        }
        else {
          $('#correoInput').addClass('is-invalid')
          $('#correoInput').removeClass('is-valid')
          valid = false
        }
        if (this.contact.telefono) {
          if (this.contact.telefono.toString().length == 10) {
            $('#telInput').addClass('is-valid')
            $('#telInput').removeClass('is-invalid')
          }
          else {
            $('#telInput').addClass('is-invalid')
            $('#telInput').removeClass('is-valid')
            valid = false
          }
        }
        else {
          $('#telInput').addClass('is-invalid')
          $('#telInput').removeClass('is-valid')
          valid = false
        }
        if (this.contact.mensaje) {
          $('#floatingTextarea').addClass('is-valid')
          $('#floatingTextarea').removeClass('is-invalid')
        }
        else {
          $('#floatingTextarea').addClass('is-invalid')
          $('#floatingTextarea').removeClass('is-valid')
          valid = false
        }
        break;
    }
    return valid
  }

  scroll(el: any) {
    el = document.getElementById(el)
    el.scrollIntoView({ behavior: 'smooth' });
  }

  getSliderImgs() {
    this.adminService.getSliders().subscribe(
      res => {
        if (res) {
          this.images = res
          this.images.forEach((slider: any) => {
            slider.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + slider.img);
          });
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  sendMail() {
    this.loadingForm = true;
    if (this.checkInput('')) {
      this.recaptchaService.execute({ action: 'enviarModal' }).then(token => {
        this.contactoService.sendTokenToBackend({ token: token, mail: this.contact }).subscribe(response => {
          if (response) {
            this.loadingForm = false;
            this.clearForm()
            this.showModal(3, 'Correo enviado', 'En breve, una persona se pondrá en contacto con usted para atender sus dudas')
          }
          else {
            this.loadingForm = false;
            this.showModal(1, 'Error', 'Ocurrió un error, intente de nuevo más tarde')
          }
        },
          err => { console.error(err); this.loadingForm = false; }
        );
      })
    }
    else {
      this.loadingForm = false;
      this.showModal(2, 'Formulario incorrecto', 'Debe llenar todos los campos y verificar que sean correctos')
    }
  }

  clearForm() {
    this.contact.mensaje = null;
    this.contact.telefono = null;
    this.contact.nombre = null;
    this.contact.correo = null;
    $('#nombreInput').removeClass('is-invalid')
    $('#nombreInput').removeClass('is-valid')
    $('#correoInput').removeClass('is-invalid')
    $('#correoInput').removeClass('is-valid')
    $('#correoInput').removeClass('is-valid')
    $('#telInput').removeClass('is-invalid')
    $('#telInput').removeClass('is-valid')
    $('#telInput').removeClass('is-valid')
    $('#floatingTextarea').removeClass('is-invalid')
    $('#floatingTextarea').removeClass('is-valid')
  }

  showModal(tipo: any, header: any, text: any) {

    //Tipo 1 -> Error
    //Tipo 2 -> Advertencia
    //Tipo 3 -> Success
    //Tipo 4 -> Info

    $('#alertModal').removeClass()

    if (tipo == 1) {
      $('#alertModal').addClass('alert alert-danger')
      this.modalIcon = faExclamationCircle;
      $('#modalText').html(text);
    }
    else if (tipo == 2) {
      $('#alertModal').addClass('alert alert-warning')
      this.modalIcon = faExclamationCircle;
      $('#modalText').html(text);
    }
    else if (tipo == 3) {
      $('#alertModal').addClass('alert alert-success')
      this.modalIcon = faCheckCircle;
      $('#modalText').html(text);
    }
    else if (tipo == 4) {
      $('#alertModal').addClass('alert alert-primary')
      this.modalIcon = faExclamationCircle;
      $('#modalText').html(text);
    }
    $('#headerModal').html(header)
    $('#advertenciaModal').modal('show')
  }
}

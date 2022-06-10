import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service'
import { faPenToSquare, faRectangleXmark, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus, faCircleExclamation, faEraser } from '@fortawesome/free-solid-svg-icons'
import { DomSanitizer } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  files: File[] = [];
  cardFile: File[] = [];
  cardCasoFile: File[] = [];

  automText: any = {};
  automTextRes: any = [];
  loadingAutomText: boolean = false;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  dtTriggerP: Subject<any> = new Subject();
  dtTriggerT: Subject<any> = new Subject();
  dtTriggerC: Subject<any> = new Subject();
  dtTriggerCa: Subject<any> = new Subject();
  dtTriggerCo: Subject<any> = new Subject();

  carruselImgs: any = [];

  panelesCards: any = [];

  termosolaresCards: any = [];

  colectoresCards: any = [];

  casosExito: any = [];

  casosExitoAutom: any = [];

  carruselImgToLoad: any = {
    img: null,
    titulo: null,
    desc: null,
    imgType: null,
    producto: null
  }

  casoExitoToLoad: any = {
    img: null,
    titulo: null,
    desc: null,
    imgType: null,
    tipoCaso: null
  }

  casoExitoEditing: any = {}
  casoExitoDeleting: any = {}

  carruselImgEditing: any = {}
  carruselImgDeleting: any = {}

  cardEditing: any = {}

  editIcon = faPenToSquare;
  xIcon = faRectangleXmark;
  addIcon = faCirclePlus;
  saveIcon = faFloppyDisk;
  warningIcon = faCircleExclamation;
  deleteIcon = faEraser;

  loadingCarruselImg = false;
  loadingCardCasos = false;
  loadingCarruselImgEdit = false;
  loadingCarruselImgDelete = false;
  loadingCardEdit = false;
  loadingCasoEdit = false;
  loadingCasoDelete = false;

  getSlidersRes: any = [];

  productos: any = [];

  constructor(private router: Router, private adminService: AdminService, private _sanitizer: DomSanitizer) { }

  public sessionStorage = sessionStorage;

  ngOnInit(): void {
    this.redirect()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTriggerP.unsubscribe();
    this.dtTriggerT.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next('');
    this.dtTriggerC.next('');
    this.dtTriggerCa.next('');
  }

  getSliders() {
    this.adminService.getSliders().subscribe(
      res => {
        this.getSlidersRes = res
        this.getSlidersRes.forEach((slider: any) => {
          slider.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + slider.img);
        });
        this.carruselImgs = []
        this.carruselImgs.push(...this.getSlidersRes)
        this.rerenderTableCarrusel();
      },
      err => console.error(err)
    )
  }

  getCasosExito() {
    this.adminService.getCasosExito().subscribe(
      res => {
        this.casosExito = res
        this.casosExito.forEach((slider: any) => {
          slider.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + slider.img);
        });
        if (this.casosExito.length > 0) { this.rerenderTableCasosExito(); }
      },
      err => console.error(err)
    )
  }

  getCasosExitoAutom() {
    this.adminService.getCasosExitoAutom().subscribe(
      res => {
        this.casosExitoAutom = res
        this.casosExitoAutom.forEach((slider: any) => {
          slider.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + slider.img);
        });
        if (this.casosExitoAutom.length > 0) { this.rerenderTableCasosExitoAutom(); }
      },
      err => console.error(err)
    )
  }

  getProductos() {
    this.adminService.getProductos().subscribe(
      res => {
        this.productos = res
      },
      err => {
        console.error(err)
      }
    )
  }

  getPanelesCards() {
    this.adminService.getCardsTable({ producto: 1 }).subscribe(
      res => {
        this.panelesCards = res
        this.panelesCards.forEach((card: any) => {
          card.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + card.img);
        });
        this.rerenderTableCardsPanel();
      },
      err => console.error(err)
    )
  }

  getTermosolaresCards() {
    this.adminService.getCardsTable({ producto: 2 }).subscribe(
      res => {
        this.termosolaresCards = res;
        this.termosolaresCards.forEach((card: any) => {
          card.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + card.img);
        });
        this.rerenderTableCardsTermo();
      },
      err => console.error(err)
    )
  }

  getColectoresCards() {
    this.adminService.getCardsTable({ producto: 4 }).subscribe(
      res => {
        this.colectoresCards = res;
        this.colectoresCards.forEach((card: any) => {
          card.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + card.img);
        });
        this.rerenderTableColectores();
      },
      err => console.error(err)
    )
  }

  rerenderTableCarrusel() {
    let table = $('#tablaSliders').DataTable()
    table.destroy();
    this.dtTrigger.next('');
  }

  rerenderTableCardsPanel() {
    let table = $('#tablaPaneles').DataTable()
    table.destroy();
    this.dtTriggerP.next('');
  }

  rerenderTableCardsTermo() {
    let table = $('#tablaTermosolares').DataTable()
    table.destroy();
    this.dtTriggerT.next('');
  }

  rerenderTableCasosExito() {
    let table = $('#tablaCasosExito').DataTable()
    table.destroy();
    this.dtTriggerC.next('');
  }

  rerenderTableCasosExitoAutom() {
    let table = $('#tablaCasosExitoAutom').DataTable()
    table.destroy();
    this.dtTriggerCa.next('');
  }

  rerenderTableColectores() {
    let table = $('#tablaColectores').DataTable()
    table.destroy();
    this.dtTriggerCo.next('');
  }

  redirect() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login'])
    }
    else {
      this.getAutomText()
      this.getSliders()
      this.getCasosExito()
      this.getCasosExitoAutom()
      this.getProductos()
      this.getPanelesCards()
      this.getTermosolaresCards()
      this.getColectoresCards()
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5, 10, 25],
        processing: true,
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
        }
      }
    }
  }

  onSelect(event: any) {
    const file = event.addedFiles[0];
    const reader = new FileReader();
    this.files[0] = event.addedFiles[0];
    this.carruselImgToLoad.imgType = event.addedFiles[0].type.toString().split('/')[1]
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.carruselImgToLoad.img = reader.result
    };
  }

  onSelectCardImg(event: any) {
    const file = event.addedFiles[0];
    const reader = new FileReader();
    this.cardFile[0] = event.addedFiles[0];
    this.cardEditing.imgType = event.addedFiles[0].type.toString().split('/')[1]
    this.cardEditing.changeImg = true;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.cardEditing.img = reader.result
    };
  }

  onSelectCardCasoImg(event: any) {
    const file = event.addedFiles[0];
    const reader = new FileReader();
    this.cardCasoFile[0] = event.addedFiles[0];
    this.casoExitoToLoad.imgType = event.addedFiles[0].type.toString().split('/')[1]
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.casoExitoToLoad.img = reader.result
    };
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRemoveCardCasoImg(event: any) {
    this.cardCasoFile.splice(this.cardCasoFile.indexOf(event), 1);
  }

  onRemoveCardImg(event: any) {
    this.cardFile.splice(this.cardFile.indexOf(event), 1);
    delete this.cardEditing.img
    delete this.cardEditing.imgType
    delete this.cardEditing.changeImg
  }

  saveImgCarrusel() {
    this.loadingCarruselImg = true;
    if (this.checkFormCarruselImg()) {
      this.adminService.setSliderImg(this.carruselImgToLoad).subscribe(
        res => {
          if (res) {
            this.files = []
            this.carruselImgToLoad.img = null
            this.carruselImgToLoad.titulo = null
            this.carruselImgToLoad.desc = null
            this.carruselImgToLoad.producto = null
            this.loadingCarruselImg = false;
            this.getSliders()
            $('#addCarruselImgModal').modal('hide');
          }
        },
        err => {
          console.error(err)
        }
      )
    }
    else {
      this.loadingCarruselImg = false;
      alert('Verifique los campos')
    }
  }

  saveCardCaso() {
    this.loadingCardCasos = true;
    this.adminService.setCasoExito(this.casoExitoToLoad).subscribe(
      res => {
        if (res) {
          this.cardCasoFile = []
          this.casoExitoToLoad.img = null
          this.casoExitoToLoad.imgType = null
          this.casoExitoToLoad.titulo = null
          this.casoExitoToLoad.desc = null
          this.loadingCardCasos = false;
          this.getCasosExito()
          this.getCasosExitoAutom()
          $('#addCasosExito').modal('hide');
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  setTipoCasoExito(tipo: number) {
    this.casoExitoToLoad.tipoCaso = tipo
  }

  checkFormCarruselImg() {
    let valid = true
    if (this.carruselImgToLoad.img && this.carruselImgToLoad.titulo && this.carruselImgToLoad.desc && this.carruselImgToLoad.producto) {
      valid = true
    }
    else {
      valid = false
    }
    return valid
  }

  editImgCarrusel(img: any) {
    $('#editCarruselImgModal').modal('show')
    this.carruselImgEditing = { ...this.carruselImgs[this.carruselImgs.indexOf(img)] }
  }

  editCardCasos(card: any, tipo: number) {
    $('#editCasoExitoModal').modal('show')
    if (tipo == 3) {
      this.casoExitoEditing = { ...this.casosExito[this.casosExito.indexOf(card)] }
    }
    else {
      this.casoExitoEditing = { ...this.casosExitoAutom[this.casosExitoAutom.indexOf(card)] }
    }
  }

  saveChangesImgCarrusel() {
    this.loadingCarruselImgEdit = true;
    this.adminService.updateSlider({ id: this.carruselImgEditing.id, titulo: this.carruselImgEditing.titulo, desc: this.carruselImgEditing.desc }).subscribe(
      res => {
        if (res) {
          this.loadingCarruselImgEdit = false;
          this.carruselImgEditing = {}
          this.getSliders()
          $('#editCarruselImgModal').modal('hide')
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  saveChangesCasoExito() {
    this.loadingCasoEdit = true;
    this.adminService.updateSlider({ id: this.casoExitoEditing.id, titulo: this.casoExitoEditing.titulo, desc: this.casoExitoEditing.desc }).subscribe(
      res => {
        if (res) {
          this.loadingCasoEdit = false;
          this.casoExitoEditing = {};
          this.getCasosExito();
          this.getCasosExitoAutom();
          $('#editCasoExitoModal').modal('hide')
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  editCard(card: any, producto: any) {
    this.cardEditing = {}
    $('#editCardModal').modal('show')
    switch (producto) {
      case 'paneles':
        this.cardEditing.titulo = this.panelesCards[this.panelesCards.indexOf(card)].titulo
        this.cardEditing.desc = this.panelesCards[this.panelesCards.indexOf(card)].desc
        this.cardEditing.idCard = this.panelesCards[this.panelesCards.indexOf(card)].idcarruselImg
        this.cardEditing.imgIdAnt = this.panelesCards[this.panelesCards.indexOf(card)].imgId
        this.cardEditing.tipo = this.panelesCards[this.panelesCards.indexOf(card)].tipo.toLowerCase() + 'paneles'
        break;
      case 'termosolares':
        this.cardEditing.titulo = this.termosolaresCards[this.termosolaresCards.indexOf(card)].titulo
        this.cardEditing.desc = this.termosolaresCards[this.termosolaresCards.indexOf(card)].desc
        this.cardEditing.idCard = this.termosolaresCards[this.termosolaresCards.indexOf(card)].idcarruselImg
        this.cardEditing.imgIdAnt = this.termosolaresCards[this.termosolaresCards.indexOf(card)].imgId
        this.cardEditing.tipo = this.termosolaresCards[this.termosolaresCards.indexOf(card)].tipo.toLowerCase() + 'termosolares'
        break;
      case 'colectores':
        this.cardEditing.titulo = this.colectoresCards[this.colectoresCards.indexOf(card)].titulo
        this.cardEditing.desc = this.colectoresCards[this.colectoresCards.indexOf(card)].desc
        this.cardEditing.idCard = this.colectoresCards[this.colectoresCards.indexOf(card)].idcarruselImg
        this.cardEditing.imgIdAnt = this.colectoresCards[this.colectoresCards.indexOf(card)].imgId
        this.cardEditing.tipo = this.colectoresCards[this.colectoresCards.indexOf(card)].tipo.toLowerCase() + 'colectoressolares'
        break;
    }
  }

  saveChangesCard() {
    this.loadingCardEdit = true
    this.adminService.updateCard(this.cardEditing).subscribe(
      res => {
        if (res) {
          this.cardEditing = {};
          this.cardFile = [];
          this.getPanelesCards();
          this.getTermosolaresCards();
          this.getColectoresCards();
          this.loadingCardEdit = false;
          $('#editCardModal').modal('hide');
        }
      },
      err => {
        this.loadingCardEdit = false;
        console.error(err)
      }
    )
  }

  confirmEliminarCaso(card: any, tipo: number) {
    $('#deleteCasoExitoModal').modal('show')
    if (tipo == 3) {
      this.casoExitoDeleting = { ...this.casosExito[this.casosExito.indexOf(card)] }
    }
    else {
      this.casoExitoDeleting = { ...this.casosExitoAutom[this.casosExitoAutom.indexOf(card)] }
    }
  }

  eliminaCasoExito() {
    this.loadingCasoDelete = true;
    this.adminService.deleteCaso({ idCaso: this.casoExitoDeleting.id, imgId: this.casoExitoDeleting.imgId, imgPath: this.casoExitoDeleting.imgPath }).subscribe(
      res => {
        if (res) {
          this.loadingCasoDelete = false;
          this.getCasosExito()
          this.getCasosExitoAutom()
          this.casoExitoDeleting = {}
          $('#deleteCasoExitoModal').modal('hide')
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  eliminaImgCarrusel() {
    this.loadingCarruselImgDelete = true;
    this.adminService.deleteSlider({ idSlider: this.carruselImgDeleting.id, imgId: this.carruselImgDeleting.imgId, imgPath: this.carruselImgDeleting.imgPath }).subscribe(
      res => {
        if (res) {
          this.loadingCarruselImgDelete = false;
          this.getSliders()
          this.carruselImgDeleting = {}
          $('#deleteCarruselImgModal').modal('hide')
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  confirmEliminaImgCarrusel(img: any) {
    $('#deleteCarruselImgModal').modal('show')
    this.carruselImgDeleting = { ...this.carruselImgs[this.carruselImgs.indexOf(img)] }
  }

  saveTextAutom() {
    this.loadingAutomText = true;
    this.adminService.setAutomText({ idtexto: this.automText.idtexto, contenido: this.automText.contenido }).subscribe(
      res => {
        if (res) {
          this.getAutomText()
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  getAutomText() {
    this.adminService.getAutomText({ seccion: 'automatizacion' }).subscribe(
      res => {
        if (res) {
          this.loadingAutomText = false;
          this.automTextRes = res
          this.automText = { ...this.automTextRes[0] }
        }
      },
      err => {
        console.error(err)
      }
    )
  }
}

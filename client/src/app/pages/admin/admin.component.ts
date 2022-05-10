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

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  dtTriggerP: Subject<any> = new Subject();

  carruselImgs: any = [];

  panelesCards: any = [];

  termosolaresCards: any = [];

  carruselImgToLoad: any = {
    img: null,
    titulo: null,
    desc: null,
    imgType: null
  }

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
  loadingCarruselImgEdit = false;
  loadingCarruselImgDelete = false;
  loadingCardEdit = false;

  getSlidersRes: any = [];

  constructor(private router: Router, private adminService: AdminService, private _sanitizer: DomSanitizer) { }

  public sessionStorage = sessionStorage;

  ngOnInit(): void {
    this.redirect()
    this.getSliders()
    this.getPanelesCards()
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTriggerP.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next('');
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

  redirect() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login'])
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

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
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
            this.loadingCarruselImg = false;
            this.getSliders()
            $('#addCarruselImgModal').modal('hide');
          }
        },
        err => {
          console.log(err)
        }
      )
    }
    else {
      this.loadingCarruselImg = false;
      alert('Verifique los campos')
    }
  }

  checkFormCarruselImg() {
    let valid = true
    if (this.carruselImgToLoad.img && this.carruselImgToLoad.titulo && this.carruselImgToLoad.desc) {
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

  editCard(card: any, producto: any) {
    this.cardEditing = {}
    $('#editCardModal').modal('show')
    switch (producto) {
      case 'paneles':
        this.cardEditing.titulo = this.panelesCards[this.panelesCards.indexOf(card)].titulo
        this.cardEditing.desc = this.panelesCards[this.panelesCards.indexOf(card)].desc
        this.cardEditing.idCard = this.panelesCards[this.panelesCards.indexOf(card)].idcarruselImg
        this.cardEditing.imgIdAnt = this.panelesCards[this.panelesCards.indexOf(card)].imgId
        this.cardEditing.tipo = this.panelesCards[this.panelesCards.indexOf(card)].tipo.toLowerCase()
        break;
      case 'termosolares':
        this.cardEditing.titulo = this.termosolaresCards[this.termosolaresCards.indexOf(card)].titulo
        this.cardEditing.desc = this.termosolaresCards[this.termosolaresCards.indexOf(card)].desc
        this.cardEditing.idCard = this.termosolaresCards[this.termosolaresCards.indexOf(card)].idcarruselImg
        this.cardEditing.imgIdAnt = this.termosolaresCards[this.termosolaresCards.indexOf(card)].imgId
        this.cardEditing.tipo = this.termosolaresCards[this.termosolaresCards.indexOf(card)].tipo.toLowerCase()
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
}

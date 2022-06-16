import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResidencialComponent } from './pages/paneles-solares/residencial/residencial.component';
import { ComercialComponent } from './pages/paneles-solares/comercial/comercial.component';
import { IndustrialComponent } from './pages/paneles-solares/industrial/industrial.component';
import { AutomatizacionComponent } from './pages/automatizacion/automatizacion.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ResidencialTsComponent } from './pages/termosolares/residencial-ts/residencial-ts.component';
import { ComercialTsComponent } from './pages/termosolares/comercial-ts/comercial-ts.component';
import { IndustrialTsComponent } from './pages/termosolares/industrial-ts/industrial-ts.component';
import { ReCaptchaModule } from 'angular-recaptcha3';
import { HttpClientModule } from '@angular/common/http'
import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import { NavComponent } from './components/nav/nav.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CasosExitoComponent } from './pages/casos-exito/casos-exito.component';
import { DataTablesModule } from 'angular-datatables';
import { ColectorSolarComponent } from './pages/termosolares/colector-solar/colector-solar.component';
import { CasosExitoAutomComponent } from './pages/casos-exito-autom/casos-exito-autom.component'
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ResidencialComponent,
    ComercialComponent,
    IndustrialComponent,
    AutomatizacionComponent,
    ContactoComponent,
    SocialMediaComponent,
    LoginComponent,
    AdminComponent,
    ResidencialTsComponent,
    ComercialTsComponent,
    IndustrialTsComponent,
    NavComponent,
    CasosExitoComponent,
    ColectorSolarComponent,
    CasosExitoAutomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ReCaptchaModule.forRoot({
      invisible: {
        sitekey: '6LcU77AfAAAAAKeLpHegnsFPrqcI6ZQZ4kU56K8g',
      },
      normal: {
        sitekey: '6LcU77AfAAAAAKeLpHegnsFPrqcI6ZQZ4kU56K8g',
      },
      language: 'en'
    }),
    HttpClientModule,
    NgxDropzoneModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTcZSY425cf0V5ykD2RKCJ4qyqS6xSJf4'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

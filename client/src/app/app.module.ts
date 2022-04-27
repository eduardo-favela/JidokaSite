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
import { ResidencialComponent as ResidencialComponentTS } from './pages/termosolares/residencial/residencial.component';
import { ComercialComponent } from './pages/paneles-solares/comercial/comercial.component';
import { ComercialComponent as ComercialComponentTS } from './pages/termosolares/comercial/comercial.component';
import { IndustrialComponent } from './pages/paneles-solares/industrial/industrial.component';
import { IndustrialComponent as IndustrialComponentTS } from './pages/termosolares/industrial/industrial.component';
import { AutomatizacionComponent } from './pages/automatizacion/automatizacion.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';

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
    ResidencialComponentTS,
    ComercialComponentTS,
    IndustrialComponentTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

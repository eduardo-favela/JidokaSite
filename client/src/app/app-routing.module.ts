import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from 'src/app/pages/inicio/inicio.component'
import { ComercialComponent } from './pages/paneles-solares/comercial/comercial.component';
import { IndustrialComponent } from './pages/paneles-solares/industrial/industrial.component';
import { ResidencialComponent } from './pages/paneles-solares/residencial/residencial.component';

import { ResidencialComponent as ResidencialComponentTS } from './pages/termosolares/residencial/residencial.component'
import { ComercialComponent as ComercialComponentTS } from './pages/termosolares/comercial/comercial.component'
import { IndustrialComponent as IndustrialComponentTS } from './pages/termosolares/industrial/industrial.component'
import { AutomatizacionComponent } from './pages/automatizacion/automatizacion.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'paneles/residencial', component: ResidencialComponent },
  { path: 'paneles/comercial', component: ComercialComponent },
  { path: 'paneles/industrial', component: IndustrialComponent },
  { path: 'termosolares/residencial', component: ResidencialComponentTS },
  { path: 'termosolares/comercial', component: ComercialComponentTS },
  { path: 'termosolares/industrial', component: IndustrialComponentTS },
  { path: 'automatizacion', component: AutomatizacionComponent },
  { path: 'contacto', component: ContactoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from 'src/app/pages/inicio/inicio.component'
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { LoginComponent } from 'src/app/components/login/login.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

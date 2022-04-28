import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  usuario : any = {

  }

  loading = false;
  invalidLogin = false;

  ngOnInit(): void {
  }

  login(){
    this.loading = true
    if (this.usuario.user && this.usuario.pass) {
      this.loginService.login(this.usuario).subscribe(
        res => {
          if (res) {
            this.loading = false
            this.invalidLogin=false
          }
          else {
            this.loading = false
            this.invalidLogin=true
          }
        },
        err => console.error(err)
      )
    }
    else {
      this.loading = false
    }
  }
}

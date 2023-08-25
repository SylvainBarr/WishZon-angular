import { Component } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {
  }
  onSubmitAuthForm(loginForm: NgForm) {
    if(loginForm.valid){
      this.authService
        .login(loginForm.value)
        .then(()=>this.router.navigateByUrl('/products'))
    }
  }

}

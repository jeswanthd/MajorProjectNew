
import { Component } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { LoginInterface } from '../../../Models/login-interface';
import { Router } from '@angular/router';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials: LoginInterface['credentials'] = {
    UserName: '',
    UserPassword: '',
    SelectedRole:''
  };
  message = ""
  constructor(private service: LoginService) { }

  Componentlogin() {
    this.service.login(this.credentials).subscribe(success => {
      if (!success) {
        this.message = "Invalid Login";
      }
    });
  }
  
}

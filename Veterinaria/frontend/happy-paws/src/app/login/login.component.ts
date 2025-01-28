import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private appService: AppService) {
  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  
  checkLogin(user: any) {
    
    const predefinedEmail = 'user1@noemail.com';
    const predefinedPassword = 'admin';

    
    if (user.email === predefinedEmail && user.password === predefinedPassword) {
     
      const token = 'dummy_bearer_token';
      this.cookieService.set("bearer_token", token, 4, '/');
      return true;
    }
    
    return false;
  }

  onSubmit() {
    
    if (this.loginForm.valid) {
      const user = this.loginForm.value;

      const isValidLogin = this.checkLogin(user);

      if (isValidLogin) {
        this.appService.setIsSignedIn(true);
        this.router.navigate(['/crear-cita']); 
      } else {
        alert('Credenciales incorrectas. Por favor, intente nuevamente.');
      }
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }

}

// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  
  constructor(private loginService: LoginService, private router: Router) {}
  
  onSubmit() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user.valid) {
          // 存储用户数据到sessionStorage
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/profile']);
        }
      },
      error: (err) => console.error('Login failed', err)
    });
  }
}

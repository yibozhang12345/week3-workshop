import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('/api/auth', { username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/profile']);
        },
        error: () => alert('用户名或密码错误')
      });
  }
}

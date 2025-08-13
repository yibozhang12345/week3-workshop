import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  birthdate = '';
  age!: number;
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('/api/register', {
      username: this.username,
      birthdate: this.birthdate,
      age: this.age,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('注册成功，请登录');
        this.router.navigate(['/login']);
      },
      error: err => alert(err.error?.message || '注册失败')
    });
  }
}

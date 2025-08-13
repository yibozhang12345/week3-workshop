import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const data = sessionStorage.getItem('user');
    if (!data) {
      this.router.navigate(['/login']);
    } else {
      this.user = JSON.parse(data);
    }
  }

  saveProfile() {
    this.http.put(`/api/user/${this.user.username}`, this.user)
      .subscribe({
        next: (updated: any) => {
          sessionStorage.setItem('user', JSON.stringify(updated));
          alert('资料已更新');
        },
        error: () => alert('更新失败')
      });
  }
}

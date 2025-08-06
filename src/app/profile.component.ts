// profile.component.ts ‌实现Profile组件
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile/profile.html'
})
export class ProfileComponent implements OnInit {
  user: any = {
    username: '',
    birthdate: '',
    age: 0,
    email: ''
  };
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    const userData = sessionStorage.getItem('currentUser');
    if (!userData) {
      this.router.navigate(['/login']);
    } else {
      this.user = JSON.parse(userData);
    }
  }
  
  updateProfile() {
    // 更新用户数据
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    // 这里可以添加API调用以更新数据库中的用户数据
  }
}

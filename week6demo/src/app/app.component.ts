import { Component } from '@angular/core';

@Component({
  selector: 'app-root',                 // 根组件选择器 <app-root>
  templateUrl: './app.component.html',  // 模板文件
  styleUrls: ['./app.component.css']    // 样式文件
})
export class AppComponent {
  title = 'your-app-name';   // 应用的标题（默认生成，可以修改或删除）
}

import { Component, OnInit } from '@angular/core';   // Angular 核心装饰器与生命周期接口
import { CommonModule } from '@angular/common';      // 提供 *ngFor、*ngIf 等指令
import { FormsModule } from '@angular/forms';        // 提供 [(ngModel)] 双向绑定
import { SocketsService } from './services/sockets'; // 导入自定义 socket 服务，用于通信

// 定义组件
@Component({
  selector: 'app-root',              // 组件选择器 <app-root>
  standalone: true,                  // ✅ Standalone 组件，不依赖 NgModule
  templateUrl: './app.html',         // 模板文件
  styleUrls: ['./app.css'],          // 样式文件
  imports: [CommonModule, FormsModule] // 在 Standalone 模式下必须手动导入依赖模块
})
export class AppComponent implements OnInit {
  // 定义两个属性：一个用于输入框绑定，一个保存消息列表
  message: string = '';
  messages: string[] = [];

  // 通过依赖注入，使用我们封装的 socket 服务
  constructor(private sockets: SocketsService) {}

  // 生命周期钩子：组件初始化时执行
  ngOnInit(): void {
    // 订阅服务中的消息流，每当收到新消息就推入数组，更新视图
    this.sockets.onMessage().subscribe((msg: string) => {
      this.messages.push(msg);
    });
  }

  // 点击 "Send" 按钮时调用的方法
  sendMessage(): void {
    const m = this.message.trim();   // 去掉输入前后的空格
    if (m) {
      this.sockets.sendMessage(m);   // 调用服务方法，把消息发到服务器
      this.message = '';             // 清空输入框
    }
  }
}

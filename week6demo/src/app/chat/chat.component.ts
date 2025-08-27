// 导入 Angular 核心模块
import { Component, OnInit } from '@angular/core';
// 导入自己写的 SocketService，用来和服务器的 socket.io 通信
import { SocketService } from '../services/socket.service';

// 使用 @Component 装饰器定义一个 Angular 组件
@Component({
  selector: 'app-chat',                  // 组件选择器，在 HTML 里用 <app-chat> 引用
  templateUrl: './chat.component.html',  // 组件对应的 HTML 模板
  styleUrls: ['./chat.component.css']    // 组件对应的样式文件
})
export class ChatComponent implements OnInit {
  // 定义一个字符串变量 message，用来存放用户当前输入的消息
  message: string = '';
  // 定义一个字符串数组 messages，用来存放所有的聊天消息（会渲染到页面上）
  messages: string[] = [];

  // 通过依赖注入的方式，把 SocketService 注入进来
  constructor(private socketService: SocketService) {}

  // 生命周期钩子：组件初始化时调用
  ngOnInit(): void {
    // 调用 socketService.getMessages() 订阅消息流
    // 每当服务器发来新消息时，就会执行回调，把消息添加到 messages 数组
    this.socketService.getMessages().subscribe((msg: string) => {
      this.messages.push(msg);
    });
  }

  // 点击“Send”按钮或按回车时会触发这个方法
  sendMessage(): void {
    // 如果输入框不是空的
    if (this.message.trim() !== '') {
      // 通过 socketService 发送消息给服务器
      this.socketService.sendMessage(this.message);
      // 把输入框清空
      this.message = '';
    }
  }
}

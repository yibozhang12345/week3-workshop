import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';   // 引入 socket.io-client 库
import { Observable } from 'rxjs';               // 用于返回消息流
import { AppConfig } from '../app.config';

// 使用 Angular 的依赖注入系统，声明这是一个可注入的服务
@Injectable({
  providedIn: 'root'   // 表示该服务在整个应用中都是单例
})
export class SocketsService {
  private socket!: Socket;// 定义 socket 实例

  constructor() {
    this.socket = io(AppConfig.apiUrl); // 构造函数里直接连接服务器
  }
// 发送消息的方法，调用 socket.emit() 向服务器发送 "message" 事件
  sendMessage(msg: string): void {
    this.socket.emit('newmsg', msg);
  }
// 返回一个 Observable，用于订阅来自服务器的消息
  onMessage(): Observable<string> {
    return new Observable(observer => {// 当收到服务器发送的 "message" 事件时，触发回调
      this.socket.on('newmsg', (msg: string) => observer.next(msg));// 把消息传给订阅者
    });
  }
}

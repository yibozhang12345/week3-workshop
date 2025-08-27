import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';   // 引入 socket.io-client 库
import { Observable } from 'rxjs';               // 用于返回消息流

// 使用 Angular 的依赖注入系统，声明这是一个可注入的服务
@Injectable({
  providedIn: 'root'   // 表示该服务在整个应用中都是单例
})
export class SocketService {
  private socket!: Socket;                       // 定义 socket 实例
  private SERVER_URL = "http://localhost:3000";  // 后端服务器地址

  constructor() {
    // 构造函数里直接连接服务器
    this.socket = io(this.SERVER_URL);
  }

  // 发送消息的方法，调用 socket.emit() 向服务器发送 "message" 事件
  public sendMessage(message: string): void {
    this.socket.emit("message", message);
  }

  // 返回一个 Observable，用于订阅来自服务器的消息
  public getMessages(): Observable<string> {
    return new Observable((observer) => {
      // 当收到服务器发送的 "message" 事件时，触发回调
      this.socket.on("message", (msg: string) => {
        observer.next(msg); // 把消息传给订阅者
      });
    });
  }
}

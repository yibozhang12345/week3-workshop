import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';         //导入 Angular 表单模块，支持 ngModel
import { AppRoutingModule } from './app-routing.module'; //导入路由配置
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';   //导入自定义的 Chat 组件

@NgModule({
  // 声明本模块中的组件
  declarations: [
    AppComponent,
    ChatComponent
  ],
  // 导入外部模块
  imports: [
    BrowserModule,       // 浏览器运行必备模块
    AppRoutingModule,    // 路由模块
    FormsModule          // 表单模块，支持 [(ngModel)]
  ],
  providers: [],          // 注入的服务（这里为空，服务一般写在根模块或 service 里）
  bootstrap: [AppComponent] // 启动时加载的根组件
})
export class AppModule { }

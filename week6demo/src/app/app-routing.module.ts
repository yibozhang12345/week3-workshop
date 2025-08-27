import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';   // 引入 Chat 组件

// 定义路由规则
const routes: Routes = [
  { path: '', component: ChatComponent }   // 当访问根路径时，显示 ChatComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // 配置根路由
  exports: [RouterModule]                   // 导出路由模块，供 app.module.ts 使用
})
export class AppRoutingModule { }

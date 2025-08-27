import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';
import { of } from 'rxjs';
//单元测试代码
describe('ChatComponent', () => {//测试('需要测试的组件实例',())
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  //fixture：Angular 测试工具 ComponentFixture，用来创建并管理组件（可以拿到 DOM 和实例）。

  // 模拟 socket service,可以避免测试时依赖真实的服务器
  const mockSocketService = {//mockSocketService：假数据服务，用来替代真正的 SocketService
    getMessages: () => of("Hello"),//getMessages() → 返回一个 Observable，始终发出 "Hello"
    sendMessage: (msg: string) => {}//sendMessage() → 空函数，不需要真正发消息。
  };

  beforeEach(async () => {//在每个测试前运行一次，配置测试模块
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],//声明要测试的组件
      imports: [ FormsModule ],//因为 ChatComponent 用到了 [(ngModel)]，必须导入 FormsModule
      providers: [
        { provide: SocketService, useValue: mockSocketService }
      ]//告诉 Angular 测试环境，用 mockSocketService 替代真实的 SocketService
    })
    .compileComponents();//编译组件模板和样式，准备好测试环境
  });

  beforeEach(() => {//真正创建组件实例
    fixture = TestBed.createComponent(ChatComponent);//创建一个 ChatComponent 的测试环境
    component = fixture.componentInstance;//拿到组件实例，可以直接访问其属性和方法
    fixture.detectChanges();//触发 Angular 的变更检测，让模板和数据同步
  });

  it('should create the chat component', () => {//第一个测试用例：检查 ChatComponent 是否能正常创建
    expect(component).toBeTruthy();//断言组件实例存在
  });

  it('should add message to messages list when new message arrives', () => {//第二个测试用例：验证新消息能加入 messages 数组
    component.ngOnInit();//手动调用组件的生命周期钩子，订阅 mockSocketService.getMessages()
    expect(component.messages).toContain("Hello");//断言通过。由于 mockSocketService.getMessages() 始终返回 "Hello"，所以 messages 应该包含 "Hello"
  });
});

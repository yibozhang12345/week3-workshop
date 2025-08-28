// Angular 自动生成的单元测试文件，用于测试 AppComponent 是否正常工作
import { TestBed } from '@angular/core/testing';   // Angular 提供的测试工具
import { AppComponent } from './app';              // 导入要测试的根组件

// 定义一个测试套件，名字叫 "AppComponent"
describe('AppComponent', () => {
  // 在每个测试前，先配置测试环境
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 声明要测试的组件
      declarations: [AppComponent],
    }).compileComponents(); // 编译模板和样式
  });

  // 测试 1：能否成功创建 AppComponent
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // 创建组件实例
    const app = fixture.componentInstance;                 // 获取组件类
    expect(app).toBeTruthy();                              // 判断组件是否存在
  });

  // 测试 2：渲染结果中是否包含指定的标题
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); // 创建组件
    fixture.detectChanges();                               // 触发变更检测，渲染 DOM
    const compiled = fixture.nativeElement as HTMLElement; // 获取渲染后的 DOM
    expect(compiled.querySelector('h1')?.textContent)      // 找到 <h1> 标签里的内容
      .toContain('Week6 Chat Demo');                       // 判断是否包含 "Week6 Chat Demo"
  });
});

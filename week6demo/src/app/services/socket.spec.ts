import { TestBed } from '@angular/core/testing';

import { Socket } from './socket';   // 导入待测试的 Socket 类

// 定义测试套件
describe('Socket', () => {
  let service: Socket;

  // 在每个测试前初始化
  beforeEach(() => {
    TestBed.configureTestingModule({});  // 配置测试模块
    service = TestBed.inject(Socket);    // 注入 Socket 服务
  });

  // 第一个测试用例：检查 Socket 服务是否创建成功
  it('should be created', () => {
    expect(service).toBeTruthy();  // 断言 service 存在
  });
});

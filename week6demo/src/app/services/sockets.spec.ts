// 单元测试文件：用于测试 sockets.ts 服务是否能被正确创建
import { TestBed } from '@angular/core/testing';
import { SocketsService } from './sockets';

describe('SocketsService', () => {
  let service: SocketsService;

  beforeEach(() => {
    // 配置测试模块
    TestBed.configureTestingModule({});
    // 注入服务实例
    service = TestBed.inject(SocketsService);
  });

  // 测试服务是否能创建成功
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

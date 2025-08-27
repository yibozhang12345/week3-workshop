// 引入所需模块
const express = require("express");
const cors = require("cors");
const http = require("http");

// 创建 Express 应用
const app = express();
app.use(cors()); // 启用跨域，允许前端 http://localhost:4200 访问

// 用 http 包创建服务器，并交给 socket.io 使用
const server = http.createServer(app);

// 初始化 socket.io，并配置 CORS
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200", // 允许前端 Angular 客户端访问
    methods: ["GET", "POST"]         // 允许的请求方法
  }
});

// 引入 sockets.js 模块，处理具体的 socket.io 事件
require("./sockets")(io);

// 引入 listen.js 模块，启动服务器监听端口
require("./listen")(server);

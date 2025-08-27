// 导出一个函数，接收 io 对象作为参数
module.exports = (io) => {
  // 当有客户端连接时触发
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // 监听客户端发送的 "message" 事件
    socket.on("message", (msg) => {
      console.log("Received:", msg);
      io.emit("message", msg); // 广播消息给所有已连接的客户端
    });

    // 当客户端断开连接时触发
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

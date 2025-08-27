// 导出一个函数，接收 server 对象
module.exports = (server) => {
  const PORT = 3000; // 设置端口号
  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// ====== MongoDB 连接 ======
mongoose.connect('mongodb://127.0.0.1:27017/angular_labs')
.then(() => console.log('✅ MongoDB 连接成功'))
.catch(err => console.error('❌ MongoDB 连接失败:', err));

// ====== 定义用户 Schema & Model ======
const userSchema = new mongoose.Schema({
  username: String,
  birthdate: String,
  age: Number,
  email: String,
  password: String,
  valid: Boolean
});

const User = mongoose.model('User', userSchema);

// ====== 中间件 ======
app.use(express.json());

// ====== API 路由 ======
app.post('/api/auth', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
      const { password, ...userData } = user.toObject();
      res.json(userData);
    } else {
      res.status(401).json({ valid: false, message: '用户名或密码错误' });
    }
  } catch (err) {
    console.error('登录接口出错:', err);
    res.status(500).json({ valid: false, message: '服务器错误' });
  }
});
// 注册接口
app.post('/api/register', async (req, res) => {
  try {
    const { username, birthdate, age, email, password } = req.body;
    // 检查用户名是否已存在
    const exist = await User.findOne({ username });
    if (exist) {
      return res.status(400).json({ message: '用户名已存在' });
    }
    const newUser = new User({ username, birthdate, age, email, password, valid: true });
    await newUser.save();
    res.json({ message: '注册成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '注册失败' });
  }
});

// 修改用户资料（假设 username 唯一且不可修改）
app.put('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { birthdate, age, email, password } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { birthdate, age, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: '用户不存在' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '更新失败' });
  }
});

// ====== 静态文件（Angular 构建后的前端） ======
app.use(express.static(path.join(__dirname, '../dist/angular-labs-new/browser')));

// ====== Angular 前端路由兜底 ======
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/angular-labs-new/browser/index.html'));
});

// ====== 启动服务 ======
app.listen(PORT, () => {
  console.log(`🚀 服务器已启动: http://localhost:${PORT}`);
});

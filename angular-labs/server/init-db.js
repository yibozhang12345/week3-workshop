const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/angular_labs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  birthdate: String,
  age: Number,
  email: String,
  password: String,
  valid: Boolean
}));

async function seedUsers() {
  await User.deleteMany({});
  await User.insertMany([
    { username: 'user1', birthdate: '1990-01-01', age: 30, email: 'user1@example.com', password: 'pass1', valid: true },
    { username: 'user2', birthdate: '1992-05-12', age: 28, email: 'user2@example.com', password: 'pass2', valid: true },
    { username: 'user3', birthdate: '1985-03-15', age: 35, email: 'user3@example.com', password: 'pass3', valid: true }
  ]);
  console.log('✅ 初始化用户数据完成');
  mongoose.disconnect();
}

seedUsers();

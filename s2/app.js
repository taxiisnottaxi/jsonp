// 引入express框架
const express = require("express");
// 路径处理模块
const path = require("path");
// 引入formidable
var formidable = require("formidable");
const { nextTick } = require("process");
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, "public")));

// 配置session
// app.use(
// 	session({
// 		isLogin: false
// 	})
// )

// 拦截所有请求
app.use((req, res, next) => {
  // 1.允许那些客户端访问我
  // *代表允许所有的客户端访问我
  res.header("Access-Control-Allow-Origin", "*");
  // 2.允许客户端使用哪些请求方法访问我
  res.header("Access-Control-Allow-Methods", "get,post");
  // 允许客户端发送跨域请求的时候携带cookie信息
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/test", (req, res) => {
  const result = 'fn({name: "张三"})';
  res.send(result);
});

app.get("/better", (req, res) => {
  // 接收客户端传递过来的函数的名称
  // const fnName = req.query.callback;
  // 经函数名称对应的函数调用代码返回给客户端
  // const data = JSON.stringify({name: "张三"});
  // const result = fnName + '(' + data + ')'
  // setTimeout(() => res.send(result), 1000)

  // jsonp这个方法做了上面这些事情
  res.jsonp({ name: "lisi", age: 20 });
});

app.get("/cross", (req, res) => {
  res.send("ok");
});

app.post("/login", (req, res) => {
  // 创建表单解析对象
  var form = formidable.IncomingForm();
  // 解析表单
  form.parse(req, (err, fields, file) => {
    // 接收客户端传递过来的用户名和密码
    const { username, password } = fields;
    // 用户名和密码比对
    if (username == "itheima" && password == "123456") {
      // 设置session
      // req.session.isLogin = true;
      res.send({ message: "登录成功" });
    } else {
      res.send({ message: "登录失败，用户名或密码错误" });
    }
  });
});

// 监听端口
app.listen(3001);
// 控制台提示输出
console.log("服务器启动成功");

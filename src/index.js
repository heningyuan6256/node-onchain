import express from "express";
import bodyParser from "body-parser";
import { router } from "./Router/index.js";

const port = 9588;

//创建web服务器
const app = express();
// 使用 body-parser 中间件来解析 JSON 格式的请求体
app.use(bodyParser.json());
//配置解析表单数据(application/x-www-form-urlencoded)格式的中间件
app.use(express.urlencoded({ extended: false }));
// 使用用户路由
app.use("/api", router);
// 通过ap.listen进行服务器的配置，并启动服务器，接收两个配置参数，一个是对应的端口号，一个是启动成功的回调函数
app.listen(port, () => {
  console.log("服务器启动成功");
});

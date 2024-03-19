import { InstanceUtils, CommonUtils } from "onchain-sdk";
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import { BasicEnv } from "../env.js";

const userLoginData = {
  email: "Hny14746999@163.com",
  password: "953924",
  userAgent: "",
};

//创建web服务器
const app = express();
// 使用 body-parser 中间件来解析 JSON 格式的请求体
app.use(bodyParser.json());
//配置解析表单数据(application/x-www-form-urlencoded)格式的中间件
app.use(express.urlencoded({ extended: false }));
// 通过ap.listen进行服务器的配置，并启动服务器，接收两个配置参数，一个是对应的端口号，一个是启动成功的回调函数
/**
 * 获取会话session
 */
app.get("/api/getSession", async (err, res) => {
  const CommonManager = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    fetch: fetch,
    tenantId: BasicEnv.tenantId,
  });
  const user_info = await CommonManager.getToken(userLoginData);
  res.send({
    code: 200,
    data: user_info.result.access_token,
  });
});

/**
 * 获取用户信息
 */
app.get("/api/getUserInfo", async (err, res) => {
  // const instance = new InstanceUtils();
  // //获取当前的权限
  // instance.getCommonButtonStatus({ tabInfo: {} });

  // const CommonManager = new CommonUtils({
  //   baseUrl: BasicEnv.baseUrl,
  //   fetch: fetch,
  // });
  // const user_info = await CommonManager.getToken(userLoginData);
  // const instance = new InstanceUtils();
  // //获取实例的信息
  // //获取当前的权限
  // instance.getCommonButtonStatus({ tabInfo: {} });
  // console.log(user_info.result, "user_info.result");
  // res.send({
  //   code: 200,
  //   data: user_info.result,
  // });
});

/**
 * 获取实例
 */
app.post("/api/instance/get", async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  const userId = data.userId;
  const instanceId = data.instanceId;

  const instance = new InstanceUtils({
    baseUrl: BasicEnv.baseUrl,
    fetch: fetch,
    token: token,
    tenantId: BasicEnv.tenantId,
  });
  await instance.getReadBasicInstanceInfo({
    userId,
    instanceId,
  });

  res.send({
    code: 200,
    data: instance,
  });
});

/**
 * 修改实例信息
 */
app.post("/api/instance/update", async (req, res) => {
  const token = req.headers.authorization;
  const params = req.body;

  const instance = new InstanceUtils({
    baseUrl: BasicEnv.baseUrl,
    fetch: fetch,
    token: token,
    tenantId: BasicEnv.tenantId,
  });

  // 获取编辑权限
  await instance.getUpdateBasicInstanceInfo({
    instanceId: params.instanceId,
    userId: params.userId,
  });

  if (!instance.hasEditAuth) {
    return res.send({
      code: 400,
      message: "当前实例不具备修改权限",
    });
  }

  // 获取基本信息
  await instance.getReadBasicInstanceInfo({
    instanceId: params.instanceId,
    userId: params.userId,
  });

  // 修改基本属性
  const updateResult = await instance.updateInstanceInfo({
    apicode: params.apicode,
    value: params.value,
  });

  res.send({
    code: 200,
    data: updateResult,
  });
});

/**
 * 获取实例的版本信息
 */
app.post("/api/getInstance/version", async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  console.log(data, "data");
  const instance = new InstanceUtils({
    baseUrl: BasicEnv.baseUrl,
    fetch: fetch,
    token: token,
    tenantId: BasicEnv.tenantId
  });
  const {
    result: { pdmAttributeCustomizedVoList, readInstanceVo },
  } = await instance.getInstanceInfo({
    tenantId: BasicEnv.tenantId,
    ...data,
  });
  res.send({
    code: 200,
    data: {
      readInstanceVo: readInstanceVo,
      pdmAttributeCustomizedVoList: pdmAttributeCustomizedVoList,
    },
  });
});

app.listen(9588, () => {
  console.log("服务器启动成功");
});

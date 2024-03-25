import { BasicEnv } from "../../../env.js";
import fetch from "node-fetch";
import { CommonUtils, IBaseInstance } from "onchain-sdk";

const userLoginData = {
  email: "Hny14746999@163.com",
  password: "953924",
  userAgent: "",
};

/**
 * 获取实例
 *
 */
const getInstanceInfo = async (req, res) => {
  // 处理参数
  const token = req.headers.authorization;
  const data = req.params;
  const userId = data.userId;
  const number = data.number;

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });
  // 有就不用获取
  await OnChainContext.getToken(userLoginData);
  const instance = await OnChainContext.getInstance(number);

  res.send({
    code: 200,
    data: instance,
  });
};

/**
 * 修改实例信息
 */
const updateInstance = async (req, res) => {
  const token = req.headers.authorization;
  const params = req.body;

  const instance = new IBaseInstance({
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
};

/**
 * 获取实例的版本信息
 */
const getInstanceVersion = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  console.log(data, "data");
  const instance = new IBaseInstance({
    baseUrl: BasicEnv.baseUrl,
    fetch: fetch,
    token: token,
    tenantId: BasicEnv.tenantId,
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
};

export { getInstanceInfo, updateInstance, getInstanceVersion };

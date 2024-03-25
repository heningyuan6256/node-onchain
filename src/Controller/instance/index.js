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

  !token && (await OnChainContext.getToken(userLoginData));

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

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });
  !token && (await OnChainContext.getToken(userLoginData));

  // 修改基本属性
  const updateResult = await instance.updateInstance({
    attrMap: params.attrMap,
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

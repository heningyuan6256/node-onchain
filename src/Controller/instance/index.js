import { BasicEnv } from "../../../env.js";
import fetch from "node-fetch";
import { InstanceUtils } from "onchain-sdk";

/**
 * 获取实例
 */
const getInstanceInfo = async (req, res) => {
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
};

/**
 * 修改实例信息
 */
const updateInstance = async (req, res) => {
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
};

/**
 * 获取实例的版本信息
 */
const getInstanceVersion = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  console.log(data, "data");
  const instance = new InstanceUtils({
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

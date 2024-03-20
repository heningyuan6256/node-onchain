import { BasicEnv } from "../../../env.js";
import fetch from "node-fetch";
import { CommonUtils } from "onchain-sdk";

const userLoginData = {
  email: "Hny14746999@163.com",
  password: "953924",
  userAgent: "",
};

/**
 * 获取会话session
 */
const getSession = async (err, res) => {
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
};

export { getSession };

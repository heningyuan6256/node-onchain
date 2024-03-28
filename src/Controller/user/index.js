import { BasicEnv } from "../../../env.js";
import fetch from "node-fetch";
import { CommonUtils } from "onchain-sdk";
import ResponseData from "../../Utils/response.js";

/**
 * 获取会话session
 */
const getSession = async (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  const userAgent = data.userAgent;
  const user = {
    email,
    userAgent,
    password,
  };
  const CommonManager = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    fetch: fetch,
    tenantId: BasicEnv.tenantId,
  });
  const user_info = await CommonManager.getToken(user);
  res.send(new ResponseData().success({ data: user_info }));
};

export { getSession };

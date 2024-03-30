import { CommonUtils, IChangeInstance } from "onchain-sdk";
import { BasicEnv } from "../../../env.js";
import fetch from "node-fetch";
import ResponseData from "../../Utils/response.js";
/**
 * 提交工作流
 */
const startWorkflow = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  const number = data.number;
  const userId = data.userId;

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });
  await OnChainContext.getUserByToken()
  const changeInstance = await OnChainContext.getInstance(number);

  const result = await changeInstance.startWorkflow();

  res.send(new ResponseData().success(result));
};

/**
 * 取消工作流
 */
const cancelWorkflow = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  const number = data.number;
  const userId = data.userId;

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });
  await OnChainContext.getUserByToken()
  const changeInstance = await OnChainContext.getInstance(number);

  const result = await changeInstance.cancelWorkflow();

  res.send(new ResponseData().success(result));
};

export { startWorkflow, cancelWorkflow };

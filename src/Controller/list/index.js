import { BasicEnv } from "../../../env.js";
import fetch from "node-fetch";
import { CommonUtils, IList } from "onchain-sdk";

/**
 * 获取列表值
 * @method post
 * @params codes === codes [{code: ""}]
 * @params
 */
const getList = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  const codeList = data.codes;
  const common = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    fetch,
    token: token,
  });
  const result = await common.transferformListByCodeList(codeList);
  res.send({
    code: 200,
    data: result,
  });
};

export { getList };

import { BasicEnv } from "../../../env.js";
import fetch from "node-fetch";
import { CommonUtils, IBaseInstance, ITab } from "onchain-sdk";
import ResponseData from "../../Utils/response.js";

/**
 * 获取实例的信息
 */
const getInstance = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.query;
  const userId = data.userId;
  const number = data.number;

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });
  const instance = await OnChainContext.getInstance(number);
  res.send(new ResponseData().success({ data: instance }));
};

/**
 * 获取实例页签的数据
 */
const getInstanceTab = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  const apicode = data.apicode;
  const number = data.number;
  const userId = data.userId;

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });

  const instance = await OnChainContext.getInstance(number);
  const tabData = await instance.getTabByApicode({ apicode: apicode });
  if (tabData) {
    const data = await tabData.getTabData();
    res.send(new ResponseData().success({ data: data }));
  } else {
    res.send(new ResponseData().error("未查到页签信息"));
  }
};

/**
 * 添加页签的实例数据
 * addInstance [{Number: 'P0001002', Qty: '1'},{Number:'', Qty: '1'}]
 */
const addDataToInstanceTab = async (req, res) => {
  // 处理参数
  const token = req.headers.authorization;
  const data = req.body;
  const apicode = data.apicode;
  const number = data.number;
  const userId = data.userId;
  const addInstance = data.addInstance;
  if (!addInstance.length) {
    res.send(new ResponseData().error("添加的实例数据为空"));
    return;
  }

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });

  const instance = await OnChainContext.getInstance(number);

  const Tab = await instance.getTabByApicode({ apicode: apicode });

  if (Tab) {
    const rowMap = ITab.transformArrayToMap(addInstance, "Number");

    const attrList = Object.keys(addInstance[0]).filter((attr) => attr.apicode != "Number");

    const IRowInstances = await OnChainContext.getInstances(addInstance.map((item) => item.Number).join(","));

    IRowInstances.forEach((row) => {
      attrList.forEach((attr) => {
        row.setAttrVal({ tab: Tab, attrApicode: attr, value: rowMap[row.number][attr] });
      });
    });

    const result = await Tab.insertTabData({ instanceRows: IRowInstances });

    res.send(new ResponseData().success({ data: result }));
  } else {
    res.send(new ResponseData().error("没有找到当前页签"));
  }
};

/**
 * 修改实例信息
 */
const updateInstance = async (req, res) => {
  const token = req.headers.authorization;
  const params = req.body;
  const number = params.number;
  const attrMap = params.attrMap;
  const userId = params.userId;

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });

  const instance = await OnChainContext.getInstance(number);

  // 修改基本属性
  const updateResult = await instance.updateInstance({
    attrMap: attrMap,
  });

  res.send({
    code: 200,
    data: updateResult,
  });
};

/**
 * 修改实例页签信息
 */
const updateDataToInstanceTab = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  const apicode = data.apicode;
  const number = data.number;
  const userId = data.userId;
  const updateInstance = data.updateInstance || [];

  if (!updateInstance.length) {
    res.send(new ResponseData().error("请输入要修改的实例编号"));

    return;
  }

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });

  const instance = await OnChainContext.getInstance(number);

  const Tab = await instance.getTabByApicode({ apicode: apicode });

  if (Tab) {
    const rowMap = ITab.transformArrayToMap(updateInstance, "Number");

    const tabData = await Tab.getTabData();

    const attrList = Object.keys(updateInstance[0]).filter((attr) => attr.apicode != "Number");

    const NumberList = updateInstance.map((item) => item.Number);

    const rows = tabData.filter((row) => NumberList.includes(row.number));

    rows.forEach((row) => {
      attrList.forEach((attr) => {
        row.updateAttrVal({ tab: Tab, attrApicode: attr, value: rowMap[row.number][attr] });
      });
    });

    const result = await Tab.updateTabData({ tabData: tabData, instanceRows: rows });

    res.send(new ResponseData().success({ data: result }));
  } else {
    res.send(new ResponseData().error("没有找到当前页签"));
  }
};

/**
 * 删除实例页签信息
 */
const delDataToInstanceTab = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  const apicode = data.apicode;
  const number = data.number;
  const userId = data.userId;
  const deleteNumbers = data.deleteNumbers || [];

  if (!deleteNumbers.length) {
    res.send(new ResponseData().error("请输入要解绑定的实例编号"));

    return;
  }

  const OnChainContext = new CommonUtils({
    baseUrl: BasicEnv.baseUrl,
    tenantId: BasicEnv.tenantId,
    userId: userId,
    fetch,
    token: token,
  });

  const instance = await OnChainContext.getInstance(number);

  const Tab = await instance.getTabByApicode({ apicode: apicode });

  if (Tab) {
    const tabData = await Tab.getTabData();

    const IRowInstances = await OnChainContext.getInstances(deleteNumbers);

    const result = await Tab.deleteTabData({ tabData: tabData, instanceRows: IRowInstances });

    res.send(new ResponseData().success({ data: result }));
  } else {
    res.send(new ResponseData().error("没有找到当前页签"));
  }
};

/**
 * 获取实例的版本信息
 */
const getInstanceVersion = async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
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

export {
  updateDataToInstanceTab,
  updateInstance,
  getInstanceVersion,
  getInstance,
  getInstanceTab,
  addDataToInstanceTab,
  delDataToInstanceTab,
};

import express from "express";
import {
  addDataToInstanceTab,
  createInstance,
  delDataToInstanceTab,
  deleteInstance,
  getInstance,
  getInstanceTab,
  getInstanceVersion,
  updateDataToInstanceTab,
  updateInstance,
} from "../Controller/instance/index.js";
import { getSession } from "../Controller/user/index.js";
import { getList } from "../Controller/list/index.js";
import { cancelWorkflow, startWorkflow } from "../Controller/workflow/index.js";

const router = express.Router();

/**
 * @api {POST} /api/token/get 用户登录
 * @apiDescription 用户登录
 * @apiName /token/get
 * @apiGroup 用户
 * @apiParam {string} email 邮箱
 * @apiParam {string} password 密码
 * @apiParam {string} userAgent 登陆平台
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/token/get", getSession);

/**
 * @api {POST} /api/instance/get 获取实例详情信息
 * @apiDescription 获取实例详情信息
 * @apiName /api/instance/get
 * @apiGroup 实例
 * @apiParam {string} number 实例编号
 * @apiParam {string} userId 用户ID
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.get("/instance/get", getInstance);

/**
 * @api {POST} /api/instance/tab/get 获取实例页签的数据
 * @apiDescription 获取实例页签的数据
 * @apiName /api/instance/tab/get
 * @apiGroup 页签
 * @apiParam {string} apicode 页签名的apicode
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/instance/tab/get", getInstanceTab);

/**
 * @api {POST} /api/instance/tab/add 添加实例页签的数据
 * @apiDescription 添加实例页签的数据
 * @apiName /api/instance/tab/add
 * @apiGroup 页签
 * @apiParam {string} apicode 页签名的apicode
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} addInstance 要添加的实例数据
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/instance/tab/add", addDataToInstanceTab);

/**
 * @api {POST} /api/instance/tab/delete 删除实例页签的数据
 * @apiDescription 删除实例页签的数据
 * @apiName /api/instance/tab/delete
 * @apiGroup 页签
 * @apiParam {string} apicode 页签名的apicode
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} deleteNumbers 要删除的实例编号
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/instance/tab/delete", delDataToInstanceTab);

/**
 * @api {POST} /api/instance/tab/update 修改实例页签的数据
 * @apiDescription 修改实例页签的数据
 * @apiName /instance/tab/update
 * @apiGroup 页签
 * @apiParam {string} apicode 页签名的apicode
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} updateInstance 要修改的实例编号
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/instance/tab/update", updateDataToInstanceTab);

/**
 * @api {POST} /api/instance/update 修改实例
 * @apiDescription 修改实例
 * @apiName /api/instance/update
 * @apiGroup 实例
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} attrMap 属性Map
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/instance/update", updateInstance);

/**
 * @api {POST} /api/workflow/start 启动工作流
 * @apiDescription 启动工作流
 * @apiName /api/workflow/start
 * @apiGroup 工作流
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/workflow/start", startWorkflow);

/**
 * @api {POST} /api/workflow/cancel 取消工作流
 * @apiDescription 取消工作流
 * @apiName /api/workflow/cancel
 * @apiGroup 工作流
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/workflow/cancel", cancelWorkflow);

/**
 * @api {POST} /api/instance/version/get 查询实例的版本
 * @apiDescription 查询实例的版本
 * @apiName /api/instance/version/get
 * @apiGroup 实例
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/instance/version/get", getInstanceVersion);

/**
 * @api {POST} /api/instance/delete 删除实例
 * @apiDescription 删除实例
 * @apiName /api/instance/delete
 * @apiGroup 实例
 * @apiParam {string} userId 用户ID
 * @apiParam {string} number 实例编号
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/instance/delete", deleteInstance);

/**
 * @api {POST} /api/instance/create 创建实例
 * @apiDescription 创建实例
 * @apiName /api/instance/create
 * @apiGroup 实例
 * @apiParam {string} userId 用户ID
 * @apiParam {string} ObjectApicode 子分类的ObjectApicode
 * @apiParam {string} params 属性的集合
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/instance/create", createInstance);

/**
 * @api {POST} /api/list/get 获取列表值
 * @apiDescription 获取列表值
 * @apiName /api/list/get
 * @apiGroup 列表值
 * @apiParam {string} userId 用户ID
 * @apiParam {string} codes 列表Code [{code: ""}]
 * @apiParam {string} headers token
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "message" : "",
 *      "data" : {},
 *  }
 * @apiVersion 1.0.0
 */
router.post("/list/get", getList);

export { router };

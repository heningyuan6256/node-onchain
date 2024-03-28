import express from "express";
import {
  addDataToInstanceTab,
  delDataToInstanceTab,
  getInstance,
  getInstanceTab,
  getInstanceVersion,
  updateDataToInstanceTab,
  updateInstance,
} from "../Controller/instance/index.js";
import { getSession } from "../Controller/user/index.js";
import { getList } from "../Controller/list/index.js";

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
 * @api {POST} /instance/tab/add 添加实例页签的数据
 * @apiDescription 添加实例页签的数据
 * @apiName /instance/tab/add
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
 * @api {POST} /instance/tab/delete 添加实例页签的数据
 * @apiDescription 添加实例页签的数据
 * @apiName /instance/tab/delete
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
 * @api {POST} /instance/tab/update 修改实例页签的数据
 * @apiDescription 添加实例页签的数据
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

router.post("/instance/version/get", getInstanceVersion);
router.post("/instance/update", updateInstance);

router.post("/list/get", getList);

export { router };

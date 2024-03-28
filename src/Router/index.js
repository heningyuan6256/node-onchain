import express from "express";
import { getInstanceInfo, getInstanceVersion, updateInstance } from "../Controller/instance/index.js";
import { getSession } from "../Controller/user/index.js";
import { getList } from "../Controller/list/index.js";

const router = express.Router();

/**
 * @api {post} /api/article 新建文章
 * @apiDescription 新建文章
 * @apiName 新建文章
 * @apiGroup 文章
 *
 * @apiSampleRequest http://localhost:3000/api/article
 *
 * @apiParam {String} title 文章标题
 * @apiParam {String} desc 描述
 * @apiParamExample {json} 请求示例
 * {
 *   "title": "文章标题",
 *   "desc": "描述"
 * }
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Object} data 返回数据
 * @apiSuccess {String} message 信息
 * @apiSuccessExample {json} 响应示例
 * {
 *   "code": 0,
 *   "data": {}
 *   "message": ""
 * }
 *
 * @apiVersion 1.0.0
 */
router.post("/list/get", getList);

// 实例路由
router.get("/instance/get", getInstanceInfo);
router.post("/instance/version/get", getInstanceVersion);
router.post("/instance/update", updateInstance);

// 会话路由
router.get("/session/get", getSession);

export { router };

import express from "express";
import { getInstanceInfo, getInstanceVersion, updateInstance } from "../Controller/instance/index.js";
import { getSession } from "../Controller/user/index.js";
import { getList } from "../Controller/list/index.js";

const router = express.Router();

// 列表路由
router.post("/list/get", getList);


// 实例路由
router.get("/instance/get", getInstanceInfo);
router.post("/instance/version/get", getInstanceVersion);
router.post("/instance/update", updateInstance);

// 会话路由
router.get("/session/get", getSession);

export { router };

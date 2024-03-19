import express from "express";
import { getInstanceInfo, getInstanceVersion, updateInstance } from "../Controller/instance/index.js";
import { getSession } from "../Controller/user/index.js";

const router = express.Router();

// 实例路由
router.post("/instance/get", getInstanceInfo);
router.post("/instance/version/get", getInstanceVersion);
router.post("/instance/update", updateInstance);

router.get("/session/get", getSession);

export { router };

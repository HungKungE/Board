import express, { Router } from "express";
import Post from "./api/Post";
import PostHeader from "./api/PostHeader";

const router: Router = express.Router();

// 라우팅 =============================
router.use("/post", Post);
router.use("/header", PostHeader);

export default router;

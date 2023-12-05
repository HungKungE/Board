import express, { Router } from "express";
import Post from "./api/Post";
import PostHeader from "./api/PostHeader";
import OpenPostData from "./api/OpenPostData";
import Comment from "./api/Comment";

const router: Router = express.Router();

// 라우팅 =============================
router.use("/post", Post);
router.use("/header", PostHeader);
router.use("/opendata", OpenPostData);
router.use("/comment", Comment);

export default router;

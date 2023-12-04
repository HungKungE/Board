import express, { Router } from "express";
import authRouter from "../auth/auth";
import userRouter from "../user/user";
import postRouter from "../post/post";

const router: Router = express.Router();

// api 엔드 포인트 등록
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);

export default router;

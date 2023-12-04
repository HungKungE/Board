import express, { Router } from "express";
import SignUp from "./api/signUp";

const router: Router = express.Router();

// 라우팅 =============================
router.use("/signup", SignUp);

export default router;

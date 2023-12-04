import express, { Router } from "express";
import SignUp from "./api/signUp";
import UpdatePassword from "./api/updatePassword";

const router: Router = express.Router();

// 라우팅 =============================
router.use("/signup", SignUp);
router.use("/update/password", UpdatePassword);

export default router;

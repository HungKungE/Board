import express, { Router } from "express";
import SignUp from "./api/signUp";

const router: Router = express.Router();

// api - 로그인
router.use("/signup", SignUp);

export default router;

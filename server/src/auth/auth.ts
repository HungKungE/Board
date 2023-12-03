import express, { Router } from "express";
import LogIn from "./api/logIn";

const router: Router = express.Router();

// api - 로그인
router.use("/login", LogIn);

export default router;
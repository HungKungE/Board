import express, { Router } from "express";
import LogIn from "./api/logIn";
import LogOut from "./api/logOut";

const router: Router = express.Router();

// 라우팅 =============================
router.use("/login", LogIn);
router.use("/logout", LogOut);

export default router;

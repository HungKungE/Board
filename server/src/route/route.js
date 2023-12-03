"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import authRouter from "../auth/auth";
const router = express_1.default.Router();
// api 엔드 포인트 등록
//router.use("/auth", authRouter);
exports.default = router;

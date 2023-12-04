"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../auth/auth"));
const user_1 = __importDefault(require("../user/user"));
const router = express_1.default.Router();
// api 엔드 포인트 등록
router.use("/auth", auth_1.default);
router.use("/user", user_1.default);
exports.default = router;

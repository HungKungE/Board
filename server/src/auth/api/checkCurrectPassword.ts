import express, { NextFunction, Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { isValidPassword } from "../../utils/validate";
import { SessionUserInfo } from "../../entity/user";
import { serializePassword } from "../../utils/serialize";
import { getUserPassword } from "../../db/context/userContext";
import CustomError from "../../api/error";

const router = express.Router();
router.post(
  "/",
  sessionAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInfo: SessionUserInfo = req.userInfo!;
    const password: string = req.body.password;

    // 입력값 검증 ============================================
    if (!isValidPassword(password)) {
      next(new CustomError("비밀번호 정책 위반", 400));
      return;
    }

    // 비밀번호 일치 여부 확인 ================================
    const userPassword: string = await getUserPassword(userInfo.nickname);

    const serializedPassword: string = await serializePassword(
      userInfo.nickname,
      password
    );

    if (userPassword !== serializedPassword) {
      next(new CustomError("비밀번호가 일치하지 않습니다!", 400));
      return;
    }

    return res.status(200).json({ success: true, error: "" });
  }
);

export default router;

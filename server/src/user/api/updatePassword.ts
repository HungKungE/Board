import express, { NextFunction, Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { isValidPassword } from "../../utils/validate";
import { SessionUserInfo, getPassword } from "../../entity/user";
import { serializePassword } from "../../utils/serialize";
import { updateUserPassword } from "../../db/context/userContext";
import CustomError from "../../api/error";

const router = express.Router();
router.post(
  "/",
  sessionAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInfo: SessionUserInfo = req.userInfo!;
    const newPassword: string = req.body.password;

    // 입력값 검증 ============================================
    if (!isValidPassword(newPassword)) {
      next(new CustomError("비밀번호 정책 위반", 400));
      return;
    }

    try {
      // 비밀번호 일치 여부 확인 ================================
      const userPassword: string = await getPassword(userInfo.nickname);

      const serializedPassword: string = await serializePassword(
        userInfo.nickname,
        newPassword
      );

      if (userPassword === serializedPassword) {
        next(new CustomError("이미 사용한 비밀번호입니다!", 200));
        return;
      }

      await updateUserPassword(userInfo.nickname, serializedPassword);

      return res.status(200).json({ success: true, error: "" });
    } catch (err) {
      next(new CustomError("DB error", 500));
      return;
    }
  }
);

export default router;

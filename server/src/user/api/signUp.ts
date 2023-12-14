import express, { NextFunction, Request, Response } from "express";
import { createUserInfo, getUserInfo } from "../../db/context/userContext";
import { UserInfo, mapToUserInfo } from "../../entity/user";
import { serializePassword } from "../../utils/serialize";
import CustomError from "../../api/error";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { nickname, password } = req.body;
  // TODO : 입력값 검증하기 ============================================

  // 사용자 존재하는지 확인 =============================================
  const userInfo = await getUserInfo(nickname);

  if (userInfo.user_id != -1) {
    next(new CustomError("이미 사용 중인 닉네임 입니다!", 401));
    return;
  }

  // 사용자 데이터 생성  ===============================================
  const serializedPassword: string = await serializePassword(
    nickname,
    password
  );

  try {
    await createUserInfo(nickname, serializedPassword);
  } catch (err) {
    next(new CustomError("db 에러", 500));
    return;
  }

  // 성공 응답 ========================================================
  res.status(200).json({
    success: true,
    error: "",
  });
});

export default router;

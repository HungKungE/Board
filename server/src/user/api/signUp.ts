import express, { Request, Response } from "express";
import { createUserInfo, getUserInfo } from "../../db/context/userContext";
import { UserInfo, mapToUserInfo } from "../../db/entity/user";
import { serializePassword } from "../../utils/serialize";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { nickname, password } = req.body;
  // TODO : 입력값 검증하기 ============================================

  // 사용자 존재하는지 확인 =============================================
  const userInfo = await getUserInfo(nickname);

  if (userInfo.user_id != -1) {
    res
      .status(401)
      .json({ success: false, error: "이미 사용 중인 닉네임 입니다!" });
    return;
  }

  // 사용자 데이터 생성  ===============================================
  const serializedPassword: string = await serializePassword(
    nickname,
    password
  );

  await createUserInfo(nickname, serializedPassword);

  // 성공 응답 ========================================================
  res.status(200).json({
    success: true,
    error: "",
  });
});

export default router;

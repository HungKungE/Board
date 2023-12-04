import express, { Request, Response } from "express";
import { getUserInfo } from "../../db/context/userContext";
import { serializePassword } from "../../utils/serialize";
import session from "express-session";
import { SessionUserInfo } from "../../db/entity/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { nickname, password } = req.body;
  /* TODO : 입력값 검증 */

  // 닉네임 -> 사용자 정보 불러오기 ======================================
  const userInfo = await getUserInfo(nickname);

  if (userInfo.user_id == -1) {
    res
      .status(401)
      .json({ success: false, error: "사용자가 존재하지 않습니다!" });
    return;
  }

  // 비밀번호 비교 ======================================================
  const serializedPassword: string = await serializePassword(
    nickname,
    password
  );

  if (userInfo.password != serializedPassword) {
    res
      .status(401)
      .json({ success: false, error: "비밀번호가 일치하지 않습니다!" });
    return;
  }

  const sessionUserInfo: SessionUserInfo = {
    user_id: userInfo.user_id,
    nickname: userInfo.nickname,
    login_time: new Date(),
    user_role: userInfo.user_role,
  };

  // 서버 세션에 저장 =================================================
  req.session.userInfo = sessionUserInfo;

  // 성공 응답 ========================================================
  res.status(200).json({
    success: true,
    id: userInfo.nickname,
    login_time: new Date(),
    is_login: true,
    error: "",
  });
});

export default router;

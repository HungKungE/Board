import express, { Request, Response } from "express";
import { getUserInfo } from "../../db/context/userContext";
import { mapToUserInfo } from "../../db/entity/user";
import { serializePassword } from "../../utils/serialize";

const router = express.Router();

const checkPassword = (userInfo: any) => {};

router.post("/", async (req: Request, res: Response) => {
  const { nickname, password } = req.body;

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

  res.status(200).json({
    success: true,
    id: userInfo.nickname,
    login_time: new Date(),
    error: "",
  });
});

export default router;

import express, { Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { isValidPassword } from "../../utils/validate";
import { SessionUserInfo, getPassword } from "../../entity/user";
import { serializePassword } from "../../utils/serialize";
import {
  getUserInfo,
  getUserPassword,
  updateUserPassword,
} from "../../db/context/userContext";

const router = express.Router();
router.post("/", sessionAuth, async (req: Request, res: Response) => {
  try {
    const userInfo: SessionUserInfo | undefined = req.userInfo;
    const password: string = req.body.password;

    // 입력값 검증 ============================================
    if (!userInfo) {
      return res.status(401).json({ success: false, error: "로그인 만료" });
    }

    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json({ success: false, error: "비밀번호 정책 위반" });
    }

    // 비밀번호 일치 여부 확인 ================================
    const userPassword: string = await getUserPassword(userInfo.nickname);

    const serializedPassword: string = await serializePassword(
      userInfo.nickname,
      password
    );

    if (userPassword !== serializedPassword) {
      return res
        .status(200)
        .json({ success: false, error: "비밀번호가 일치하지 않습니다!" });
    }

    return res.status(200).json({ success: true, error: "" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "server error:" + err });
  }
});

export default router;

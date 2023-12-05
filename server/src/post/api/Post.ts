import express, { Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { SessionUserInfo } from "../../entity/user";
import { createPost } from "../../db/context/postContext";

const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {});

router.post("/", sessionAuth, async (req: Request, res: Response) => {
  const userInfo: SessionUserInfo | undefined = req.userInfo;
  const title: string = req.body.title;
  const content: string = req.body.content;

  // 입력값 검증 ============================================
  if (!userInfo) {
    return res.status(401).json({ success: false, error: "로그인 만료" });
  }

  // 포스트 추가 ============================================
  await createPost(userInfo.user_id, title, content);

  // 요청 응답 ==============================================
  return res.status(200).json({ success: true, error: "" });
});

export default router;

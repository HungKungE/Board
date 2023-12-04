import express, { Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { SessionUserInfo } from "../../db/entity/user";
import { createPost, getPostContent } from "../../db/context/postContext";

const router = express.Router();

router.get("/", sessionAuth, async (req: Request, res: Response) => {
  const userInfo: SessionUserInfo | undefined = req.session.userInfo;
  const postId: string | undefined = req.query.post_id as string;

  // 입력값 검증 ============================================
  if (!userInfo) {
    return res.status(401).json({ success: false, error: "로그인 만료" });
  }

  if (!postId) {
    return res
      .status(401)
      .json({ success: false, error: "잘못된 post_id 요청" });
  }

  // 포스트 정보 받기 ============================================
  const content: string = await getPostContent(parseInt(postId));

  // 요청 응답 ==============================================
  return res.status(200).json({ success: true, content: content, error: "" });
});

export default router;

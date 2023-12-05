import express, { Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { SessionUserInfo } from "../../entity/user";
import { createComment, getComments } from "../../db/context/postContext";
import { CommentData } from "../../entity/post";

const router = express.Router();

router.get("/", sessionAuth, async (req: Request, res: Response) => {
  const userInfo: SessionUserInfo | undefined = req.userInfo;
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
  const commentDatas: CommentData[] = await getComments(parseInt(postId));

  // 요청 응답 ==============================================
  return res
    .status(200)
    .json({ success: true, commentDatas: commentDatas, error: "" });
});

router.post("/", sessionAuth, async (req: Request, res: Response) => {
  const userInfo: SessionUserInfo | undefined = req.userInfo;
  const postId: number = req.body.post_id;
  const content: string = req.body.content;

  // 입력값 검증 ============================================
  if (!userInfo) {
    return res.status(401).json({ success: false, error: "로그인 만료" });
  }

  // 포스트 추가 ============================================
  await createComment(userInfo.user_id, postId, content);

  // 요청 응답 ==============================================
  return res.status(200).json({ success: true, error: "" });
});

export default router;

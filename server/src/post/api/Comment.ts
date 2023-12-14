import express, { NextFunction, Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { SessionUserInfo } from "../../entity/user";
import { createComment, getComments } from "../../db/context/postContext";
import { CommentData } from "../../entity/post";
import CustomError from "../../api/error";

const router = express.Router();

router.get(
  "/",
  sessionAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInfo: SessionUserInfo | undefined = req.userInfo;
    const postId: string | undefined = req.query.post_id as string;

    // 입력값 검증 ============================================
    if (!userInfo) {
      next(new CustomError("로그인 만료", 401));
      return;
    }

    if (!postId) {
      next(new CustomError("잘못된 요청", 401));
      return;
    }

    // 포스트 정보 받기 ============================================
    const commentDatas: CommentData[] = await getComments(parseInt(postId));

    // 요청 응답 ==============================================
    return res
      .status(200)
      .json({ success: true, commentDatas: commentDatas, error: "" });
  }
);

router.post(
  "/",
  sessionAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInfo: SessionUserInfo = req.userInfo!;
    const postId: number = req.body.post_id;
    const content: string = req.body.content;

    try {
      // 포스트 추가 ============================================
      await createComment(userInfo.user_id, postId, content);

      // 요청 응답 ==============================================
      return res.status(200).json({ success: true, error: "" });
    } catch (e) {
      next(new CustomError("DB error", 500));
    }
  }
);

export default router;

import express, { NextFunction, Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { getPostContent } from "../../db/context/postContext";
import CustomError from "../../api/error";

const router = express.Router();

router.get(
  "/",
  sessionAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const postId: string | undefined = req.query.post_id as string;

    // 입력값 검증 ============================================
    if (!postId) {
      next(new CustomError("잘못된 post_id 요청", 401));
      return;
    }

    // 포스트 정보 받기 ============================================
    try {
      const content: string = await getPostContent(parseInt(postId));
      // 요청 응답 ==============================================
      return res
        .status(200)
        .json({ success: true, content: content, error: "" });
    } catch (e) {
      next(new CustomError("DB error", 500));
      return;
    }
  }
);

export default router;

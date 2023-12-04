import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  // 세션에서 정보 제거
  delete req.session.nickname;
  delete req.session.userId;
  delete req.session.login_time;

  res.status(200).json({
    success: true,
    error: "",
  });
});

export default router;

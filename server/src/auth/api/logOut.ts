import express, { Request, Response } from "express";
import { userInfo } from "os";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  // 세션에서 정보 제거
  req.session.destroy;

  res.status(200).json({
    success: true,
    error: "",
  });
});

export default router;

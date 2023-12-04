import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  /* TODO : 세션에서 사용자 정보 제거 */

  res.status(200).json({
    success: true,
    error: "",
  });
});

export default router;

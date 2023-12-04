import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  delete req.session.userInfo;

  res.status(200).json({
    success: true,
    error: "",
  });
});

export default router;

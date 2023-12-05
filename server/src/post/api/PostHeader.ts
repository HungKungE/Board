import express, { Request, Response } from "express";
import sessionAuth from "../../api/checkSession";
import { SessionUserInfo } from "../../entity/user";
import { getPostHeaders } from "../../db/context/postContext";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const postHeaders = await getPostHeaders();

  return res
    .status(200)
    .json({ success: true, postHeaders: postHeaders, error: "" });
});

//router.post("/", async (req: Request, res: Response) => {});

export default router;

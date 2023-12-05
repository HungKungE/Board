import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { isLoginSessionExpired } from "../utils/time";
import { userInfo } from "os";
import { SessionUserInfo } from "../entity/user";

dotenv.config();

const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
  const sessionUserInfo = req.session.userInfo;

  if (!sessionUserInfo) {
    return res
      .status(401)
      .json({ success: false, error: "로그인 정보 유효하지 않음!" });
  }

  const userInfo: SessionUserInfo = JSON.parse(sessionUserInfo);

  if (isLoginSessionExpired(userInfo.login_time)) {
    return res.status(401).json({ success: false, error: "로그인 만료됨!" });
  }

  // 로그인 시간 업데이트 -> 연장
  userInfo.login_time = new Date();
  req.userInfo = userInfo;
  req.session.userInfo = JSON.stringify(userInfo);

  next();
};

export default sessionAuth;

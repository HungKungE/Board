import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { isLoginSessionExpired } from "../utils/time";

dotenv.config();

const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
  const userInfo = req.session.userInfo;

  if (!userInfo) {
    return res
      .status(401)
      .json({ success: false, error: "로그인 정보 유효하지 않음!" });
  }

  if (isLoginSessionExpired(userInfo.login_time)) {
    return res.status(401).json({ success: false, error: "로그인 만료됨!" });
  }

  // 로그인 시간 업데이트 -> 연장
  req.session.userInfo = { ...userInfo, login_time: new Date() };

  next();
};

export default sessionAuth;

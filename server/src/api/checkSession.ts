import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { isLoginSessionExpired } from "../utils/time";
import { SessionUserInfo } from "../entity/user";
import CustomError from "./error";

dotenv.config();

const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
  const sessionUserInfo = req.session.userInfo;

  if (!sessionUserInfo) {
    next(new CustomError("로그인 정보 유효하지 않음!", 401));
    return;
  }

  const userInfo: SessionUserInfo = JSON.parse(sessionUserInfo);

  if (isLoginSessionExpired(userInfo.login_time)) {
    next(new CustomError("로그인 정보 만료", 401));
    return;
  }

  // 로그인 시간 업데이트 -> 연장
  userInfo.login_time = new Date();
  req.userInfo = userInfo;
  req.session.userInfo = JSON.stringify(userInfo);

  next();
};

export default sessionAuth;

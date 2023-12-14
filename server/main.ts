// dependency =======================================
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import * as redis from "redis";
import RedisStore from "connect-redis";
// our_module =======================================
import route from "./src/route/route";
import { SessionUserInfo } from "./src/entity/user";
import { errorHandler } from "./src/api/error";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// session storage
declare module "express-session" {
  export interface SessionData {
    userInfo?: string;
  }
}

declare module "express" {
  export interface Request {
    userInfo?: SessionUserInfo;
  }
}

// Redis 연결 설정
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: false,
});
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then();

// 로컬에서 실행시키려면 store: new session.MemoryStore() 로 바꾸기
app.use(
  session({
    secret: process.env.SESSION_KEY || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: redisClient,
      ttl: 30,
    }),
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1일
    },
  })
);

// api 엔드 포인트 등록 -> api 요청을 라우팅 처리
app.use("", route);
app.use(errorHandler);

// build 파일 접근
app.use(express.static(`${__dirname}/../client/build`));

app.get(`*`, (req: Request, res: Response) => {
  let indexPath = path.join(__dirname, "../client/build/index.html");
  res.sendFile(indexPath);
});

app.listen(port, () => console.log(`port: ${port}`));

export default app;

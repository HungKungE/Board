import express from "express";
import bodyParser from "body-parser";
import path from "path";
// dependency
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
// our_module
import route from "./src/route/route";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting
app.use(cors());

// session storage
// 로컬에서 실행시키려면 store: new session.MemoryStore() 로 바꾸기
app.use(
  session({
    secret: process.env.SESSION_KEY || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore(),
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1일
    },
  })
);

// api 엔드 포인트 등록
app.use("", route);

// build 파일 접근
app.use(express.static(`${__dirname}/../client/build`));

// react 앱과 연결
app.get(`*`, (req, res) => {
  let indexPath = path.join(__dirname, "../client/build/index.html");
  res.sendFile(indexPath);
});

app.listen(port, () => console.log(`port: ${port}`));

export default app;

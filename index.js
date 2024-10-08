const compression = require('compression');
const cors = require('cors');
const { indexRouter } = require('./src/router/indexRouter.js');
const { userRouter } = require('./src/router/userRouter.js');

const express = require('express');
const app = express();
const port = 4000;

// express 미들웨어 설정

// 정적 파일 제공
app.use(express.static('front'));

// cors 설정
app.use(cors());

// body json 파싱
app.use(express.json());

// HTTP 요청 압축
app.use(compression());

// 라우터 분리
indexRouter(app);
userRouter(app);

app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`);
});

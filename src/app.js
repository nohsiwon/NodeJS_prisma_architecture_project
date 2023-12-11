require('dotenv').config();
const express = require('express');
const apiRouter = require('./routes/index');
const { errorHandlingMiddleware } = require('./middlewares/error-handling.middleware');

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use('/api', [apiRouter]);
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸습니다');
});

require('dotenv').config();
const express = require('express');
const UsersController = require('../controllers/users.controller');
const { tokenMiddleware } = require('../middlewares/auth');
const router = express.Router();

const usersController = new UsersController();

// 회원가입 API
router.post('/signup', usersController.signUp);

// 로그인
router.post('/signin', usersController.signIn);

// 정보 조회
router.get('/myinfo', tokenMiddleware, usersController.myInfo);

module.exports = router;

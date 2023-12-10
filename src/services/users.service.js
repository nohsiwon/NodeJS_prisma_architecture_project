require('dotenv').config();
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UsersRepository = require('../repositories/users.repository');

module.exports = class UsersService {
  usersRepository = new UsersRepository();

  // 회원가입 Service
  signUp = async (email, userPw, comparePw) => {
    const hashedPw = await bcrypt.hash(userPw, 10);

    const existEmail = await this.usersRepository.existEmail(email);

    // 정보가 없는 경우
    if (!(email && userPw && comparePw)) {
      throw new Error('전부 입력 해주세요.');
    }

    // 중복된 이메일인 경우
    if (existEmail) {
      throw new Error('이미 가입된 이메일입니다');
    }

    // 형식이 비정상적인 경우
    if (!validator.isEmail(email)) {
      throw new Error('형식이 일치하지 않습니다');
    }

    // 형식이 비정상적인 경우
    if (
      (typeof email === 'undefined' && typeof email !== 'string') ||
      (typeof userPw === 'undefined' && typeof userPw !== 'string')
    ) {
      throw new Error('형식이 일치하지 않습니다');
    }

    // 패스워드6자가 넘지 않을 경우
    if (userPw.length < 6) {
      throw new Error('패스워드는 6자를 넘겨주세요');
    }

    // 확인패스워드가 정확하지 않는경우
    if (userPw !== comparePw) {
      throw new Error('패스워드가 정확히자 않습니다');
    }

    const user = await this.usersRepository.signUp(email, hashedPw);

    return {
      email: user.email,
    };
  };

  // 로그인 Service
  signIn = async (email, userPw) => {
    const user = await this.usersRepository.signIn(email);

    const userId = user.userId;

    // 정보가 없는 경우
    if (!(email && userPw)) {
      throw new Error('전부 입력 해주세요.');
    }

    // 회원 정보가 없는 경우
    if (!user) {
      throw new Error('가입 정보가 없습니다.');
    }

    // 형식이 비정상적인 경우
    if (
      (typeof email === 'undefined' && typeof email !== 'string') ||
      (typeof userPw === 'undefined' && typeof userPw !== 'string')
    ) {
      throw new Error('형식이 일치하지 않습니다.');
    }

    const pwMatch = await bcrypt.compare(userPw, user.userPw);

    // 비밀번호가 일치하지 않을 경우
    if (!pwMatch) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const token = jwt.sign({ userId }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
    return {
      email: user.email,
      token,
    };
  };

  // 정보 조회 Service
  myInfo = async (userId) => {
    const user = await this.usersRepository.myInfo(userId);

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    return {
      userId: user.userId,
      email: user.email,
      createdAt: user.createdAt,
    };
  };
};

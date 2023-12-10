const UsersService = require('../services/users.service');

module.exports = class UsersController {
  usersService = new UsersService();

  // 회원가입 Controller
  signUp = async (req, res, next) => {
    try {
      const { email, userPw, comparePw } = req.body;

      const user = await this.usersService.signUp(email, userPw, comparePw);

      return res.status(200).json({ success: true, message: `${user.email}님! 회원가입 성공하셨습니다` });
    } catch (err) {
      next(err);
    }
  };

  // 로그인 Controller
  signIn = async (req, res, next) => {
    try {
      const { email, userPw } = req.body;

      const user = await this.usersService.signIn(email, userPw);

      return res
        .status(200)
        .json({ success: true, message: `${user.email}님! 로그인에 성공하셨습니다`, token: user.token });
    } catch (err) {
      next(err);
    }
  };

  // 정보 조회 Controller
  myInfo = async (req, res, next) => {
    try {
      const userId = res.locals.user;

      const userInfo = await this.usersService.myInfo(userId);

      return res.status(200).json({ success: true, message: '정보 조회 성공했습니다', userInfo });
    } catch (err) {
      next(err);
    }
  };
};

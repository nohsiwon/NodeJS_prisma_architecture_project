const prisma = require('../util/prisma/index');

module.exports = class UsersRepository {
  // 중복확인 Repository
  existEmail = async (email) => {
    const user = await prisma.Users.findUnique({ where: { email } });

    return user;
  };

  // 회원가입 Repository
  signUp = async (email, hashedPw) => {
    await prisma.Users.create({ data: { email, userPw: hashedPw } });

    const user = await prisma.Users.findUnique({ where: { email } });

    return {
      email: user.email,
    };
  };

  // 로그인 Repository
  signIn = async (email) => {
    const user = await prisma.Users.findUnique({ where: { email } });

    return {
      email: user.email,
      userId: user.userId,
      userPw: user.userPw,
    };
  };

  // 정보 조회 Repository
  myInfo = async (userId) => {
    const user = await prisma.Users.findUnique({ where: { userId } });

    return {
      userId: user.userId,
      email: user.email,
      createdAt: user.createdAt,
    };
  };
};

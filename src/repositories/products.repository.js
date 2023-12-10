const prisma = require('../util/prisma/index');

module.exports = class ProductsRepository {
  // 상품 생성 repositories
  createProduct = async (title, content, UserId) => {
    const createProduct = await prisma.Products.create({ data: { title, content, UserId } });

    console.log(createProduct);

    return createProduct;
  };

  // 상품 조회 repositories
  getAllProducts = async () => {
    const getAllProduct = await prisma.Products.findMany();

    return getAllProduct;
  };
  // 상품 상세 조회 repositories
  getOneProduct = async (productId) => {
    const getOneProduct = await prisma.Products.findUnique({
      where: { productId: +productId },
    });
    return getOneProduct;
  };

  // 상품 수정 repositories
  updateProduct = async (productId, title, content, status, UserId) => {
    const updateProduct = await prisma.Products.update({
      data: { title, content, status },
      where: {
        productId: +productId,
        UserId: +UserId,
      },
    });

    return updateProduct;
  };

  // 상품 삭제 repositories
  deleteProduct = async (productId) => {
    const deleteProduct = await prisma.Products.delete({ where: { productId: +productId } });

    return deleteProduct;
  };
};

const ProductsService = require('../services/products.service');

module.exports = class ProductsController {
  productsService = new ProductsService();

  // 상품 생성 controller
  createProduct = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const UserId = res.locals.user;
      const createProduct = await this.productsService.createProduct(title, content, UserId);

      return res.status(200).json({ success: true, message: '판매 상품을 등록하였습니다', data: createProduct });
    } catch (err) {
      next(err);
    }
  };

  // 상품 조회 controller
  getAllProducts = async (req, res, next) => {
    try {
      const { sort } = req.query;

      const products = await this.productsService.getAllProducts(sort);

      return res.status(200).json({ success: true, message: '상품 목록 조회했습니다', data: products });
    } catch (err) {
      next(err);
    }
  };

  // 상품 상세 조회 controller
  getOneProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;

      const findProduct = await this.productsService.getOneProduct(productId);

      if (findProduct) {
        return res.status(200).json({ success: true, message: '상품 상세 조회 성공했습니다', data: findProduct });
      } else {
        return res.status(404).json({ success: false, errorMessage: '상품이 존재하지 않습니다' });
      }
    } catch (err) {
      next(err);
    }
  };

  // 상품 수정 controller
  updateProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { title, content, status } = req.body;
      const UserId = res.locals.user;

      const updateProduct = await this.productsService.updateProduct(productId, title, content, status, UserId);

      return res.status(200).json({
        success: true,
        message: '상품 정보를 수정하였습니다',
        data: updateProduct,
      });
    } catch (err) {
      next(err);
    }
  };

  // 상품 삭제 controller
  deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    const UserId = res.locals.user;

    try {
      const deleteProduct = await this.productsService.deleteProduct(productId, UserId);

      return res.status(200).json({ success: true, message: '상품을 삭제하였습니다', data: deleteProduct });
    } catch (err) {
      next(err);
    }
  };
};

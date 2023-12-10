const ProductRepository = require('../repositories/products.repository');

module.exports = class ProductsService {
  productRepository = new ProductRepository();

  // 상품 생성 service
  createProduct = async (title, content, UserId) => {
    const createProduct = await this.productRepository.createProduct(title, content, UserId);

    return createProduct;
  };

  // 상품 조회 service
  getAllProducts = async (sort) => {
    const products = await this.productRepository.getAllProducts();

    products.sort((a, b) => {
      if (sort === 'asc') {
        return a.productId > b.productId ? 1 : -1;
      } else if (sort === 'desc') {
        return a.productId < b.productId ? 1 : -1;
      } else {
        return a.productId < b.productId ? 1 : -1;
      }
    });

    return products;
  };

  // 상품 상세 조회 service
  getOneProduct = async (productId) => {
    const findProduct = await this.productRepository.getOneProduct(productId);

    return findProduct;
  };

  // 상품 수정 service
  updateProduct = async (productId, title, content, status, UserId) => {
    const product = await this.productRepository.getOneProduct(productId);
    if (!product) {
      throw new Error('상품을 찾을 수 없습니다');
    }

    if (product.UserId !== UserId) {
      throw new Error('상품 수정 권한이 없습니다');
    }

    await this.productRepository.updateProduct(productId, title, content, status, UserId);

    const updatedProduct = await this.productRepository.getOneProduct(productId);

    return updatedProduct;
  };

  // 상품 삭제 service
  deleteProduct = async (productId, UserId) => {
    const deleteProduct = await this.productRepository.getOneProduct(productId);
    if (!deleteProduct) {
      throw new Error('상품을 찾을 수 없습니다');
    }

    if (deleteProduct.UserId !== UserId) {
      throw new Error('상품 삭제 권한이 없습니다');
    }

    await this.productRepository.deleteProduct(productId, UserId);

    return deleteProduct;
  };
};

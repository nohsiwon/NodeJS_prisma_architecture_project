require('dotenv').config();
const express = require('express');
const ProductsController = require('../controllers/products.controller');
const { tokenMiddleware } = require('../middlewares/auth');
const router = express.Router();

const productsController = new ProductsController();

// 상품 생성 API
router.post('/', tokenMiddleware, productsController.createProduct);

// 상품 목록 조회 API
router.get('/', productsController.getAllProducts);

// 상품 상세 조회 API
router.get('/:productId', productsController.getOneProduct);

// 상품 정보 수정 API
router.put('/:productId', tokenMiddleware, productsController.updateProduct);

// 상품 삭제 API
router.delete('/:productId', tokenMiddleware, productsController.deleteProduct);

module.exports = router;

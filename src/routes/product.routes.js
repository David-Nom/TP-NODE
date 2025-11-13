const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

// POST /products
router.post('/', createProduct);

// GET /products
router.get('/', getAllProducts);

// GET /products/:id
router.get('/:id', getProductById);

// PUT /products/:id
router.put('/:id', updateProduct);

// DELETE /products/:id
router.delete('/:id', deleteProduct);

module.exports = router;

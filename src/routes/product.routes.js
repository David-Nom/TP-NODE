// Router Express = permet de créer des routes séparées
const express = require('express');
const router = express.Router();

// On importe les fonctions du contrôleur
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

// On dit simplement :
// "si quelqu’un appelle POST /products → exécute createProduct"

// Créer un produit
router.post('/', createProduct);

// Lire tous les produits
router.get('/', getAllProducts);

// Lire 1 produit
router.get('/:id', getProductById);

// Modifier un produit
router.put('/:id', updateProduct);

// Supprimer un produit
router.delete('/:id', deleteProduct);

// On exporte pour utiliser ces routes ailleurs
module.exports = router;

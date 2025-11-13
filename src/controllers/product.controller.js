// On importe le modèle Product pour pouvoir interagir avec la base MongoDB
const Product = require('../models/product');

// ------------------------------------------------------
// 1) CRÉER un produit
// ------------------------------------------------------
exports.createProduct = async (req, res) => {
  try {
    // req.body = les données envoyées par l’utilisateur (POSTMAN, Front-end...)
    const { name, description, price, quantity } = req.body;

    // On crée un objet Product
    const product = new Product({
      name,
      description,
      price,
      quantity,
    });

    // On sauvegarde dans la base
    const savedProduct = await product.save();

    // 201 = "Créé avec succès"
    return res.status(201).json(savedProduct);

  } catch (error) {
    // Si l’utilisateur oublie un champ obligatoire = erreur
    return res.status(400).json({
      message: 'Erreur lors de la création du produit',
      error: error.message,
    });
  }
};

// ------------------------------------------------------
// 2) LISTER tous les produits
// ------------------------------------------------------
exports.getAllProducts = async (req, res) => {
  try {
    // .find() = récupère TOUTE la collection
    const products = await Product.find();
    return res.status(200).json(products);

  } catch (error) {
    return res.status(500).json({
      message: 'Erreur serveur',
      error: error.message,
    });
  }
};

// ------------------------------------------------------
// 3) RÉCUPÉRER UN SEUL produit via son ID
// ------------------------------------------------------
exports.getProductById = async (req, res) => {
  try {
    // req.params = les valeurs dans l'URL
    const { id } = req.params;

    const product = await Product.findById(id);

    // Si l'ID ne correspond à rien
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    return res.status(200).json(product);

  } catch (error) {
    return res.status(400).json({
      message: 'ID invalide ou erreur de recherche',
      error: error.message,
    });
  }
};

// ------------------------------------------------------
// 4) METTRE À JOUR un produit
// ------------------------------------------------------
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // findByIdAndUpdate = met à jour directement
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,         // les données à modifier
      {
        new: true,       // on retourne le produit mis à jour
        runValidators: true, // vérifie les règles du schéma
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    return res.status(200).json(updatedProduct);

  } catch (error) {
    return res.status(400).json({
      message: 'Erreur lors de la mise à jour',
      error: error.message,
    });
  }
};

// ------------------------------------------------------
// 5) SUPPRIMER un produit
// ------------------------------------------------------
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    return res.status(200).json({
      message: 'Produit supprimé avec succès',
      deletedProduct,
    });

  } catch (error) {
    return res.status(400).json({
      message: 'Erreur lors de la suppression',
      error: error.message,
    });
  }
};
🟦 3. Routes : product.routes.js
📘 (Explication claire)
js
Copier le code
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

const Product = require('../models/product');

// 1. Créer un produit
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const product = new Product({
      name,
      description,
      price,
      quantity,
    });

    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(400).json({
      message: 'Erreur lors de la création du produit',
      error: error.message,
    });
  }
};

// 2. Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la récupération des produits',
      error: error.message,
    });
  }
};

// 3. Récupérer un produit par ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    return res.status(200).json(product);
  } catch (error) {
    // En cas d’ID invalide (ObjectId non valide par ex.)
    return res.status(400).json({
      message: 'ID invalide ou erreur lors de la récupération du produit',
      error: error.message,
    });
  }
};

// 4. Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,          // retourne le document mis à jour
        runValidators: true // applique les validations du schéma
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({
      message: 'Erreur lors de la mise à jour du produit',
      error: error.message,
    });
  }
};

// 5. Supprimer un produit
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
      message: 'Erreur lors de la suppression du produit',
      error: error.message,
    });
  }
};

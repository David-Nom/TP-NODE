// On importe mongoose : c’est la librairie qui permet de parler avec MongoDB
const mongoose = require('mongoose');

// On crée un "schéma".
// Un schéma = la structure d’un objet dans la base de données.
const productSchema = new mongoose.Schema({
  // Le nom du produit (obligatoire)
  name: {
    type: String,      // doit être du texte
    required: true,    // l'utilisateur est obligé d'en fournir un
  },

  // Description du produit (facultative)
  description: {
    type: String,
  },

  // Prix (obligatoire)
  price: {
    type: Number,      // un nombre
    required: true,
  },

  // Quantité en stock
  quantity: {
    type: Number,
    required: true,
    default: 0,        // valeur par défaut si non fourni
  },

  // Date de création automatique
  createdAt: {
    type: Date,
    default: Date.now, // prend automatiquement la date du jour
  },
});

// On transforme le schéma en "modèle"
// Le modèle permet de faire : find(), save(), update(), delete()...
const Product = mongoose.model('Product', productSchema);

// On exporte pour pouvoir l’utiliser ailleurs
module.exports = Product;
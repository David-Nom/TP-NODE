// Import des modules nécessaires
const express = require('express');   // framework pour créer une API
const mongoose = require('mongoose'); // pour MongoDB
const cors = require('cors');         // autorise les requêtes externes (front)
const dotenv = require('dotenv');     // permet de lire .env

// Charger les variables d'environnement (.env)
dotenv.config();

const app = express();

// ----- MIDDLEWARES -----
// Permet de lire le JSON envoyé par les utilisateurs
app.use(express.json());

// Autorise les requêtes venant d’autres domaines (front-end)
app.use(cors());

// Import des routes
const productRoutes = require('./routes/product.routes');

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.log('Erreur connexion MongoDB:', err.message));

// Utilisation des routes
// http://localhost:3000/products
app.use('/products', productRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

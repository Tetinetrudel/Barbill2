import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import path from "path";
import { fileURLToPath } from "url";
import multer from 'multer'

import authRoutes from './routes/auth.js'
import clientRoutes from './routes/clients.js'
import productRoutes from './routes/products.js'
import categoryRoutes from './routes/categories.js'
import invoiceRoutes from './routes/invoices.js'
import userRoutes from './routes/users.js'

import { updateUser } from './controllers/users.js'
import { corsOptions } from './config/corsOptions.js';

/* variable settings */
const app = express()
//const PORT = process.env.PORT || 5000
//const MONGODB_URI = process.env.MONGO_URI

/* configuration settings */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.patch("/users/:id", upload.single("picture"), updateUser);

/* connection to the database */
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connecté à MongoDB')
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à MongoDB:', error)
})

/* routes onfiguration */
app.use('/auth', authRoutes)
app.use('/clients', clientRoutes)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/invoices', invoiceRoutes)
app.use('/users', userRoutes)

/* connection to the app */
app.listen(process.env.PORT, () => {
    console.log(`Mongo DB est maintenant connecté et l'Application est lancé et fonctionne sur le port ${process.env.PORT}`)
})


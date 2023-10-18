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
import settingsRoutes from './routes/settings.js'

import { corsOptions } from './config/corsOptions.js';
import { connectDB } from './config/dbConn.js';

/* variable settings */
const app = express()

dotenv.config()

const PORT = process.env.PORT || 3500

connectDB()

/* configuration settings */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


/* routes onfiguration */
app.use('/auth', authRoutes)
app.use('/clients', clientRoutes)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/invoices', invoiceRoutes)
app.use('/users', userRoutes)
app.use('/settings', settingsRoutes)

/* connection to the app */
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})


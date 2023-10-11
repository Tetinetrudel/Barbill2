import express from 'express'
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct, setPopular } from '../controllers/products.js'
import requireLogin from '../middleware/auth.js'

const router = express.Router()

router.get('/', requireLogin, getProducts)
router.get('/:id', requireLogin, getProduct)
router.post('/', requireLogin, addProduct)
router.patch('/:id', requireLogin, updateProduct)
router.delete('/:id', requireLogin, deleteProduct)
router.patch('/:id/popular', setPopular)

export default router

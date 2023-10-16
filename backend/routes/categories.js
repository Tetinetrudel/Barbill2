import express from 'express'
import { getCategories, getCategory, addCategory, updateCategory, deleteCategory} from '../controllers/categories.js'
import requireLogin from '../middleware/auth.js'

const router = express.Router()

router.get('/', requireLogin, getCategories)
router.get('/:id', requireLogin, getCategory)
router.post('/', requireLogin, addCategory)
router.patch('/:id', requireLogin, updateCategory)
router.delete('/:id', requireLogin, deleteCategory)

export default router
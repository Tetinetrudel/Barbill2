import express from 'express'
import { getUser, updateUser, updateUserPassword } from '../controllers/users.js'

const router = express.Router()

router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.patch('/:id/update-password', updateUserPassword);

export default router

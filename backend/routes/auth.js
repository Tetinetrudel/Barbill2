import express from 'express'
import { login, register } from '../controllers/auth.js'
import { refreshAccessToken } from '../controllers/refreshToken.js'


const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/refresh_token', refreshAccessToken)

export default router

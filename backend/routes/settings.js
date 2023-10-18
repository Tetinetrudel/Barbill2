import express from 'express'
import { getSettings, updateSettings } from '../controllers/settings.js'

const router = express.Router()

router.get('/', getSettings)
router.patch('/', updateSettings)

export default router
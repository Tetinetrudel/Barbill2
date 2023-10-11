import express from 'express'
import { getInvoices, getInvoice, addInvoice, updateInvoice, deleteInvoice } from '../controllers/invoices.js'
import requireLogin from '../middleware/auth.js'

const router = express.Router()

router.get('/', requireLogin, getInvoices)

router.get('/:id', requireLogin, getInvoice)

router.post('/', requireLogin, addInvoice)
router.patch('/:id', requireLogin, updateInvoice)
router.delete('/:id', requireLogin, deleteInvoice)

export default router
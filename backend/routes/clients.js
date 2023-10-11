import express from 'express'
import { getClients, getClient, addClient, updateClient, updateClientBill, deleteClient, removeProductFromClient, decreaseCardCount, increaseCardCount } from '../controllers/clients.js'
import requireLogin from '../middleware/auth.js'

const router = express.Router();

router.get('/', requireLogin, getClients)
router.get('/:id', requireLogin, getClient)
router.post('/', requireLogin, addClient)
router.patch('/:id', requireLogin, updateClient)
router.patch('/:id/bill', requireLogin, updateClientBill)
router.delete('/:id', requireLogin, deleteClient)
router.patch('/:id/remove-product/', removeProductFromClient)
router.patch('/:id/minus-cards', decreaseCardCount)
router.patch('/:id/plus-cards', increaseCardCount)

export default router

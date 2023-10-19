import Clients from '../models/clients.js'
import Products from '../models/products.js'

export const getClients = async (req, res) => {
    const userId = req.userId
    try {
        const clients = await Clients.find({ user: userId }).populate('products.product').populate('cards.product')
        if(clients.length === 0) {
            return res.status(404).json({ message: `Aucun client trouvé`})
        }

        return res.status(200).json({success: true, clients})
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const getClient = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    try {
        const client = await Clients.findById(id)
        .populate('products.product')
        .populate('cards.product')

        if (!client) {
            return res.status(404).json({ message: `Le client sélectionné n'existe pas.`})
        }

        if (client.user.toString() !== userId) {
          return res.status(403).json({ message: `Non autorisé. Vous n'êtes autorisé à supprimer ce client` })
        }

        return res.status(200).json({ success: true, client})
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const addClient = async (req, res) => {
    const userId = req.userId
    const { fullname, email } = req.body

    try {
        if(!fullname || !email) {
          return res.status(409).json({ message: `Tous le champs doivent être complété`})
        } 
        
        const existingUser = await Clients.findOne({ user: userId, email })
        if(existingUser) {
            return res.status(404).json({ message: `Un client avec le courriel: ${email} existe déjà`})
        }

        if (client.user.toString() !== userId) {
          return res.status(403).json({ message: `Non autorisé. Vous n'êtes autorisé à supprimer ce client` })
        }

        const newClient = new Clients({
            user: userId,
            fullname,
            email
        })
        const client = await newClient.save()
        return res.status(200).json({ success: true, message: `${fullname} a été créer avec succès`, client})
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const updateClient = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    const { updatedName, updatedEmail } = req.body
    try {
      const existingClient = await Clients.findOne({ user: userId, email: updatedEmail }).exec()
      if (existingClient && existingClient._id.toString() !== id) {
        return res.status(400).json({ message: `Cet email est déjà utilisé par un autre client` })
      }
  
      const updateFields = {}
      if (updatedName) {
        updateFields.fullname = updatedName
      }
      if (updatedEmail) {
        updateFields.email = updatedEmail
      }
  
      const updatedClient = await Clients.findByIdAndUpdate(
        id,
        updateFields,
        { new: true }
      )
      res.json({ success: true, message: `Client bien modifié`, updatedClient })
        
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const updateClientBill = async (req, res) => {
    try {
        const { id } = req.params
        const { productId } = req.body
        const userId = req.userId
    
        const client = await Clients.findById(id)
        const product = await Products.findById(productId)

        if (!client || !product) {
          return res.status(404).json({ error: 'Aucun client ou produit retrouvé.' })
        }

        if (client.user.toString() !== userId) {
          return res.status(403).json({ message: `Non autorisé. Vous n'êtes autorisé à supprimer ce client` })
        }

        client.products.push({ product: productId, addedAt: Date.now() })
        client.status = true

        if (product.name.toLowerCase().includes('carte')) {
          client.cards.push({ product: productId, count: 10 })
        }

        const updatedClient = await client.save()
    
        res.status(200).json({ success: true, message: `le produit ${product.name} a bien été ajouter à ${client.fullname}`, updatedClient})
        
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const removeProductFromClient = async (req, res) => {
    const { id } = req.params
    const { productId } = req.body
    try {
        const updatedClient = await Clients.findByIdAndUpdate(
            id,
            { $pull: { products: { _id: productId } } },
            { new: true } 
          )
          if (!updatedClient) {
            return res.status(404).json({ message: `Le client n'a pas été trouvé` })
          }

          if(updatedClient.products.length === 0) {
            updatedClient.status = false
          }

          await updatedClient.save()
          
          return res.status(200).json({ success: true, updatedClient })
    } catch (error) {
        console.error('Erreur lors de la connexion', error.message)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const deleteClient = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    try {
        const client = await Clients.findById(id)
        if (!client) {
          return res.status(404).json({ message: `Ce client n'existe pas.` })
        }
        if (client.user.toString() !== userId) {
          return res.status(403).json({ message: `Non autorisé. Vous n'êtes autorisé à supprimer ce client` })
        }
        if(client.products?.length || client.cards?.length) {
          return res.status(400).json({ message: `${client.fullname} as encore des produits à son compte.`})
        }
        const deletedClient = await Clients.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: `le client ${client.fullname} a été supprimé avec succès`, deletedClient })
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const decreaseCardCount = async (req, res) => {
  const { id } = req.params
  const { cardId } = req.body
  try {
    const client = await Clients.findById(id)

    if (!client) {
        return res.status(404).json({ message: `Le client n'a pas été trouvé` })
    }

    const cardIndex = client.cards.findIndex(card => card._id == cardId)

    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Aucune carte retrouvée' })
    }

    if (client.cards[cardIndex].count > 0) {
      client.cards[cardIndex].count -= 1
    }

    //if (client.cards[cardIndex].count === 0) {
    //  client.cards.splice(cardIndex, 1);
    //}
    
    await client.save()

    return res.status(200).json({ success: true, client })
  } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
  }
}

export const increaseCardCount = async (req, res) => {
  const { id } = req.params
  const { cardId } = req.body
  try {
    const client = await Clients.findById(id)

    if (!client) {
        return res.status(404).json({ message: `Le client n'a pas été trouvé` })
    }

    const cardIndex = client.cards.findIndex(card => card._id == cardId)

    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Aucune carte retrouvée' })
    }

    if (client.cards[cardIndex].count >= 0) {
      client.cards[cardIndex].count += 1
    }
   
    await client.save()

    return res.status(200).json({ success: true, client })
  } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
  }
}


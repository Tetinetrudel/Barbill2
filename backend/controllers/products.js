import Products from '../models/products.js'
import Categories from '../models/categories.js'

export const getProducts = async (req, res) => {
    const userId = req.userId
    try {
        const products = await Products.find({ user: userId }).populate('category').sort({ isPopular: -1, category: -1 })
        if(products.length === 0) {
            return res.status(404).json({ message: `Aucun produit trouvé`})
        }
        return res.status(200).json({success: true, products})
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Products.findById(id).populate('category')
        if(!product) {
            return res.send(403).json({ message: `Le produit recherché n'a pas été trouvé`})
        }

        res.status(200).json({ success: true, product })
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const addProduct = async (req, res) => {
    const userId = req.userId
    const { name, category, quantity, price  } = req.body
    try {
        const existingProduct = await Products.findOne({ user: userId, name })
        if(existingProduct) {
            return res.status(403).json({message: `Le produit ${name} existe déjà`})
        }

        const newProduct = new Products({ 
            user: userId,
            name,
            category,
            quantity,
            price
        })

        const product = await newProduct.save()
        return res.status(200).json({ success: true, message: `Le produit ${name} créée avec succès`, product})

    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    const { name, category, quantity, price } = req.body
  
    try {
        const cat = await Categories.findOne({ name: category })
        const product = await Products.findById(id)

        if (!product) {
            return res.status(404).json({ message: `Ce produit n'existe pas.` })
        }
        if (product.user.toString() !== userId) {
            return res.status(403).json({ message: `Non autorisé. Vous n'êtes autorisé à supprimer cette catégorie` })
        }
      
        if (name !== product.name) {
            const productWithSameName = await Products.findOne({ name })
            if (productWithSameName) {
                return res.status(402).json({ message: `Le produit ${name} existe déjà`})
            }
        }

        const updatedProduct = await Products.findByIdAndUpdate(
            id, 
            { $set: { 
                name,
                category: cat._id,
                quantity, 
                price
            } },
            { new: true })
  
        res.status(200).json({ success: true, product: updatedProduct })
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    try {
        const product = await Products.findById(id)
        if (!product) {
          return res.status(404).json({ message: `Ce produit n'existe pas.` })
        }
        if (product.user.toString() !== userId) {
          return res.status(403).json({ message: `Non autorisé. Vous n'êtes autorisé à supprimer cette catégorie` })
        }
        const deletedProduct = await Products.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: `le produit ${product.name} a été supprimé avec succès`, deletedProduct })
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const setPopular = async (req, res) => {
    try {
      const { id } = req.params
      const product = await Products.findById(id)
        
      if(!product) {
        return res.status(404).json({ message: `Le produit sélectionné n'existe pas`})
      }
      
      product.isPopular = !product.isPopular
      product.save(product.isPopular)

      res.status(201).json({success: true, product})
    }
       catch (error) {
        res.status(500).json({ message: "Erreur interne au server. Veuillez recommancer" })
    }
}
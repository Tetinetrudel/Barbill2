import Categories from '../models/categories.js'
import Products from '../models/products.js'

export const getCategories = async (req, res) => {
    const userId = req.userId
    try {
        const categories = await Categories.find({ user: userId })
        if(categories.length === 0) {
            return res.status(404).json({ message: `Aucune catégories trouvées`})
        }
        return res.status(200).json({ success: true, categories})
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const addCategory = async (req, res) => {
    const userId = req.userId
    const { name } = req.body
    try {
        if(!name) {
            return res.status(400).json({ message: `Vous devez entrer un nom de catégorie valide.`})
        }
        
        const existingCategory = await Categories.findOne({user: userId, name })
        if(existingCategory) {
            return res.status(403).json({message: `La catégorie ${name} existe déjà`})
        }

        const newCategory = new Categories({ 
            user: userId,
            name
        })

        const category = await newCategory.save()
        return res.status(200).json({ success: true, category})

    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const getCategory = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Categories.findById(id).populate('user')
        if(!category) {
            return res.send(403).json({ message: `La catégorie recherchée n'a pas été trouvée`})
        }

        res.status(200).json({ success: true, category })
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    const { name } = req.body
  
    try {
      const category = await Categories.findById(id)
      if (!category) {
        return res.status(404).json({ message: `Cette catégorie n'existe pas.` })
      }
      if (category.user.toString() !== userId) {
        return res.status(403).json({ message: `Non autorisé. Vous n'êtes autorisé à modifier cette catégorie` })
      }
      if(category.name === name) {
        return res.status(402).json({ message: `la catégorie ${name} existe déjà`})
      }

      const updatedCategory = await Categories.findByIdAndUpdate(
        id, 
        { $set: { name } },
        { new: true })
  
      res.status(200).json({ success: true, category: updatedCategory })
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    try {
        const category = await Categories.findById(id)
        if (!category) {
          return res.status(404).json({ message: `Cette catégorie n'existe pas.` })
        }
        if (category.user.toString() !== userId) {
          return res.status(403).json({ message: `Non autorisé. Vous n'êtes autorisé à supprimer cette catégorie` })
        }
        const products = await Products.find({ user: userId })
        
        const isActiveCategory = products.filter((product) => product.category.toString() === id)

        if(isActiveCategory.length > 0) {
                return res.status(409).json({ message: `la catégorie ${category.name} a encore plusieurs produits associés. SVP, veuillez les supprimer avant de détruire la catégorie.` })
        }
        
        const deletedCategory = await Categories.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: `la Catégorie ${category.name} a été supprimé avec succès`, deletedCategory })
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}
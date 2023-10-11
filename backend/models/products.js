import mongoose from "mongoose"
import Clients from './clients.js'

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    imageUrl: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    isPopular: {
        type: Boolean,
        default: false,
        required: false
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

productSchema.index({ name: 1, category: 1, isPopular: 1, quantity: 1, price: 1, user: 1}, { unique: true })

// Create a post remove middleware for the product schema
productSchema.post("remove", async function (doc, next) {
    try {
      const clientsWithDeletedProduct = await Clients.find({
        "products.product": doc._id,
      })
  
      await Promise.all(
        clientsWithDeletedProduct.map(async (client) => {
          client.products = client.products.filter(
            (product) => !product.product.equals(doc._id)
          )
          await client.save()
        })
      )
      next()
    } catch (error) {
      next(error)
    }
})

const Products = mongoose.model('Products', productSchema)

export default Products
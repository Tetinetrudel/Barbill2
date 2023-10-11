import mongoose from "mongoose"

const clientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },
            addedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    cards: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },
            count: {
                type: Number,
                default: 10
            }
        }
    ],
}, {timestamps: true})


clientSchema.methods.updateStatus = function () {
    this.status = this.products.length > 0
}
  
clientSchema.pre('save', function (next) {
    this.updateStatus()
    next()
})

const Clients = mongoose.model('Clients', clientSchema)

export default Clients
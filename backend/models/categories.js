import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
   // user: {
   //     type: mongoose.Schema.Types.ObjectId,
   //     ref: 'Users',
   //     required: true
   // },
    name: {
        type: String,
        required: true
    }
}, {timestamp: true})

categorySchema.index({ name: 1, user: 1 }, { unique: true })

const Categories = mongoose.model('Categories', categorySchema)

export default Categories
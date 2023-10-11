import mongoose from 'mongoose'

const refreshSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
})

const RefreshToken = mongoose.model('RefreshToken', refreshSchema)

export default RefreshToken
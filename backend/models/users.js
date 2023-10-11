import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    } 
}, {timestamp: true})

const Users = mongoose.model('Users', userSchema)

export default Users

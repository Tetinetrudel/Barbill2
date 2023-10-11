import mongoose from 'mongoose'

const RIGHTS = ['readOnly', 'canModify']

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    name: {
        type: String,
        required: true,
        unique: false,
    },
    pin: {
        type: String,
        required: true,
    },
    rights: {
        type: string,
        enum: RIGHTS,
        default: 'readOnly'
    }
}, {timestamp: true})

const Employees = mongoose.model('Employees', userSchema)

export default Employees
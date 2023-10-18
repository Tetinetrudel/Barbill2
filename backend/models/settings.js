import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    employee: {
        type: Boolean,
        default: false,
    },
}, {timestamp: true})

const Settings = mongoose.model('Settings', settingSchema)

export default Settings
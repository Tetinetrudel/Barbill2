import mongoose, { Schema } from "mongoose"

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    //employee: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Employees'
    //},
    product: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Products'
    }],
    total: {
        type: String
    },
    method: {
        type: String
    }
}, { timestamps: true})

const Invoices = mongoose.model('Invoices', invoiceSchema)
export default Invoices
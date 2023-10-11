import Invoices from '../models/invoices.js'

export const getInvoices = async (req, res) => {}
export const getInvoice = async (req, res) => {}

export const getNextInvoiceNumber = async () => {
    try {
        const latestInvoice = await Invoices.findOne().sort({invoiceNumber: -1 }).limit(1)
        if (latestInvoice) {
            return latestInvoice.invoiceNumber + 1
        }

        return 1
    } catch (error) {
       throw new Error("Erreur en essayant de trouver la dernière facture") 
    }
}

export const addInvoice = async(req, res) => {
    const { productIds, totalPrice, paymentMethod } = req.body
    try {
        const invoiceNumber = await getNextInvoiceNumber()

        const newInvoice = new Invoices({ 
            invoiceNumber: invoiceNumber,
            //employee: employeeId, 
            product: [...productIds], 
            total: totalPrice,
            method: paymentMethod
         })

        const invoice = await newInvoice.save()
    
        if (invoice) { 
            return res.status(201).json({ success: true, invoice})
        } 
    } catch (error) {
        res.status(500).json({ message: `Erreur au niveau du server. Veuillez recommencer`})
    }
}

export const updateInvoice = async (req, res) => {}
export const deleteInvoice = async (req, res) => {}
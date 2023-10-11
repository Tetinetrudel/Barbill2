import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  uniqueInvoice: [],
  totalPrice: 0,
}

export const uniqueInvoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addProductToInvoice: (state, action) => {
      const product = action.payload
      state.uniqueInvoice.push(product)
      state.totalPrice += product.price
    },
    removeProduct: (state, action) => {
      const productId = action.payload
      const productIndex = state.uniqueInvoice.findIndex((invoice) => invoice._id === productId)
  
      if (productIndex !== -1) {
      const removedProduct = state.uniqueInvoice[productIndex]
          if (removedProduct.count > 1) {
              removedProduct.count--
          } else {
              state.uniqueInvoice.splice(productIndex, 1)
          }
          state.totalPrice -= removedProduct.price
      }
    },
    clearProductToInvoice: (state) => {
      state.uniqueInvoice = []
      state.totalPrice = 0
    }
  },
})

export const { addProductToInvoice, removeProduct, clearProductToInvoice } = uniqueInvoiceSlice.actions
export default uniqueInvoiceSlice.reducer
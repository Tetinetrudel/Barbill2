import React from 'react'
import { useDispatch } from 'react-redux'

import { fetchRemoveProductFromClient } from '../../api/clients/Clients'
import { addProductToInvoice } from '../../reducers/invoices/Invoices'

import { BsFillCreditCardFill} from 'react-icons/bs'
import { BiTrash } from 'react-icons/bi'

import '../../pages/clients/Clients.css'

const ClientBill = ({ client, isUpdated, setIsUpdated, isUpdatedDetails, setIsUpdatedDetails }) => {
  const dispatch = useDispatch()
  const clientId = client._id
  const uniqueProductIds = new Set()
  const uniqueProducts = client.products.filter(product => {
    if (uniqueProductIds.has(product.product._id)) {
      return false
    }
    uniqueProductIds.add(product.product._id)
    return true
  })

  const productStatsMap = {}
  client.products.forEach(product => {
    if (!productStatsMap[product.product.name]) {
      productStatsMap[product.product.name] = {
        count: 1,
        sum: product.product.price,
      };
    } else {
      productStatsMap[product.product.name].count++
      productStatsMap[product.product.name].sum += product.product.price
     }
  })

  const totalPrice = (client.products.reduce((sum, product) => sum + product.product.price, 0)).toFixed(2)

  const handleRemoveProduct = async (productId) => {
    try {
      const result = await fetchRemoveProductFromClient(clientId, productId)
      if(result.success) {
        setIsUpdated(!isUpdated)
        setIsUpdatedDetails(!isUpdatedDetails)  
        console.log(result.updatedClient)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const handlePaidBill = async (item) => {
    try {
      const result = await fetchRemoveProductFromClient(clientId, item._id)
      if(result.success) {
        setIsUpdated(!isUpdated)
        setIsUpdatedDetails(!isUpdatedDetails)  
        dispatch(addProductToInvoice(item.product))
      } else {
        console.error(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  
  return (
    <div className='client-bill'>
        <div className="client-bill-title">
            <h2>Facture</h2>
        </div>
        <div className="client-bill-body">
        {uniqueProducts.map(item => (
        <div className="client-bill-content" key={item.product._id}>
            <p className='client-bill-product-name'>
                {item.product.name} 
                {productStatsMap[item.product.name].count > 1 ? ` (x${productStatsMap[item.product.name].count})` : ""}
            </p>
            <div className="client-bill-amount">
                <p className='client-bill-price'>{(productStatsMap[item.product.name].sum).toFixed(2)}$</p>
                <button className='btn btn-blue' onClick={() => handleRemoveProduct(item._id)}>
                    <BiTrash />
                </button>
                <button className='btn btn-blue btn-small' onClick={e => handlePaidBill(item)}>
                    <BsFillCreditCardFill />
                </button>
            </div>
        </div>
        ))}
        </div>
        <div className="client-bill-footer">
            <p><strong>Total</strong></p>
            <p><strong>{totalPrice} $</strong></p>
        </div>
    </div>
  )
}

export default ClientBill
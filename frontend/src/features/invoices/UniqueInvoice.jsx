import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addProductToInvoice, removeProduct } from '../../reducers/invoices/Invoices'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import './Invoices.css'

const UniqueInvoice = () => {
  const dispatch = useDispatch()

  const products = useSelector((state) => state.invoiceReducer.uniqueInvoice)
  const totalPrice = useSelector((state) => state.invoiceReducer.totalPrice)

  
  const uniqueProductIds = new Set()
  const uniqueProducts = products.filter(product => {
    if (uniqueProductIds.has(product._id)) {
      return false 
    }
    uniqueProductIds.add(product._id)
    return true
  })

  const handleAddProduct = (product) => {
    dispatch(addProductToInvoice(product))
  }

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId))
  }

  const productStatsMap = {}
  products.forEach(item => {
    const { name, price } = item
    if (!productStatsMap[name]) {
      productStatsMap[name] = {
        count: 1,
        sum: price,
      };
    } else {
      productStatsMap[name].count++
      productStatsMap[name].sum += price
    }
  })

  return (
    <div className='unique-invoice'>
      <div className="invoice-section">
        <div className="invoice-body">
          <div className="invoice-title">
            <h1>Facture</h1>
          </div>
          {uniqueProducts.map((item) => (
          <div className="invoice-product" key={item._id}>
            <p className='invoice-item'>{item.name} </p>
            <div className="count-box">
              <span className='minus-box pointer' onClick={() => handleRemoveProduct(item._id)}>
                <AiOutlineMinus className='minus-plus' />
              </span>
              <span className='number-box'>
                <p className="invoice-item">{productStatsMap[item.name].count}</p>
              </span>
              <span className='plus-box pointer' onClick={() => handleAddProduct(item)}>
                <AiOutlinePlus className='minus-plus'/>
              </span>
            </div>
          </div>
          ))}
        </div>
        <div className="invoice-footer">
          <div className="invoice-footer-total">
            <p>Total :</p>
            <p>{totalPrice.toFixed(2)}$</p>
          </div>
          <button 
            className={products.length !== 0 ? 'btn btn-blue' : 'btn btn-disabled'} 
             
          >
            Payer
          </button>
        </div>
      </div>
    </div>
  )
}

export default UniqueInvoice
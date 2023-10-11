import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchSetPopular } from '../../api/products/Products'

import { addProductToInvoice } from '../../reducers/invoices/Invoices'

import { AiFillStar } from 'react-icons/ai'
import { BiPlusMedical } from 'react-icons/bi'

import '../../pages/home/Home.css'
import '../../pages/products/Products.css'

const DashboardProductList = ({ props }) => {
  const accessToken = useSelector((state) => state.authReducer.token)
  const dispatch = useDispatch()

  const handleSetPopular = async (productId) => {
    try {
        const result = await fetchSetPopular(accessToken, productId)
        if(result.success) {
            props.setIsUpdated(!props.isUpdated)
        } else {
            console.error(result.message)
        }
    } catch (error) {
        throw new Error(error)
    }
  }

  const handleAddToInvoice = (product) => {
    dispatch(addProductToInvoice(product))
  }

  return (
    <ul className="products-table">
      <li className="products-table-header">
        <div className="col-1">Nom</div>
        <div className="col-2">Catégorie</div>
        <div className="col-3">Populaire</div>
        <div className="col-4">Quantité</div>
        <div className="col-4">Prix</div>
        <div className="col-4"></div>
      </li>
      {props.error && (
        <li className='products-table-row'>
            <p>{props.error}</p>
        </li>
      )}
      {props.isLoading && (
        <li className="products-table-row">
            <p>Chargement ...</p>
        </li>
      )}
      {props.filteredProducts.length === 0 && (
        <li className="products-table-row">
            <p>Aucun produits</p>
        </li>
      )}
      {props.filteredProducts.length > 0 && props.filteredProducts.map((product) => (
        <li className="products-table-row" key={product._id}>
          <div className="col-1">
            <p>{product.name}</p>
          </div>
          <div className="col-2">{product.category.name}</div>
          <div className="col-3">
            <AiFillStar 
                className={product.isPopular ? 'colored-star' : 'black-star'} 
                onClick={() => handleSetPopular(product._id)}
            />
          </div>
          <div className="col-4">{product.quantity}</div>
          <div className="col-4">
           {(product.price).toFixed(2)} $
          </div>
          <div className="col-4 flex-icons">
            <BiPlusMedical className='edit-icon' onClick={() => handleAddToInvoice(product)}/>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default DashboardProductList
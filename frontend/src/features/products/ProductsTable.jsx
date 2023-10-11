import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchSetPopular } from '../../api/products/Products'
import { fetchDeleteProduct } from '../../api/products/Products'

import ProductUpdate from './ProductUpdate'

import { BiTrash, BiEdit } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'

import '../../pages/clients/Clients.css'


const ClientsTable = ({ products, filteredProducts, error, isUpdated, setIsUpdated }) => {
    const accessToken = useSelector((state) => state.authReducer.token)

    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [productId, setProductId] = useState("")

    const handleOpenUpdate = (productId) => {
        setProductId(productId)
        setIsOpenUpdate(!isOpenUpdate)
    }
    
    const handleSetPopular = async (productId) => {
        try {
            const result = await fetchSetPopular(accessToken, productId)
            if(result.success) {
                setIsUpdated(!isUpdated)
            } else {
                console.error(result.message)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    const handleDelete = async (productId) => {
        try {
            const result = await (fetchDeleteProduct(accessToken, productId))
            if(result.success) {
                setIsUpdated(!isUpdated)
            } else {
                console.log(result.message)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

  return (
    <>
    {isOpenUpdate && <ProductUpdate products={products} productId={productId} isUpdated={isUpdated} setIsUpdated={setIsUpdated} setIsOpenUpdate={setIsOpenUpdate} />}
    <ul className="products-table">
        <li className="products-table-header">
            <div className="col-1">Nom</div>
            <div className="col-2">Catégorie</div>
            <div className="col-3">Populaire</div>
            <div className="col-4">Quantité</div>
            <div className="col-4">Prix</div>
            <div className="col-4"></div>
        </li>
        {error && (
            <li className='products-table-row'>
                <p>{error}</p>
            </li>
        )}
        {filteredProducts.length === 0 && (
            <li className="products-table-row">
                <p>Aucun produits</p>
            </li>
        )}
        {filteredProducts.length > 0 && filteredProducts.map((product) => (
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
                <BiEdit className='edit-icon' onClick={() => handleOpenUpdate(product._id)}/>
                <BiTrash className='trash-icon' onClick={() => handleDelete(product._id)} />
            </div>
        </li>
        ))}
    </ul>
    </>
  )
}

export default ClientsTable
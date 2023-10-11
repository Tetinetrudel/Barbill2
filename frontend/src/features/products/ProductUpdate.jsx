import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { AiOutlineClose, AiOutlineNumber } from 'react-icons/ai'
import { BiDollar, BiSolidCategory, BiRename } from 'react-icons/bi'

import { fetchUpdateProduct } from '../../api/products/Products'

import '../../pages/products/Products.css'


const ProductUpdate = ({ products, productId, setIsOpenUpdate, isUpdated, setIsUpdated }) => {
  const accessToken = useSelector((state) => state.authReducer.token)
  const product = products.filter(p => p._id === productId)
  const [name, setName] = useState(product[0].name)
  const [category, setCategory] = useState(product[0].category.name)
  const [quantity, setQuantity] = useState(product[0].quantity)
  const [price, setPrice] = useState(product[0].price)
  const [error, setError] = useState("")

  console.log(products)
  if(!product) {
    return <p>Aucun produit trouvé</p>
  }
  
  const handleSubmit = async (e, productId) => {
    e.preventDefault()
    try {
      const payload ={ name, category, quantity, price}
      const result = await fetchUpdateProduct(accessToken, payload, productId)
      if(result.success) {
        setIsUpdated(!isUpdated)
        setIsOpenUpdate(false)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='product-update-modal-backdrop'>
      <div className="product-update-modal-wrapper">
        <div className="product-update-header">
          <h2>Modifier les informations</h2>
          <AiOutlineClose onClick={() => setIsOpenUpdate(false)} />
        </div>
        <div className="product-update-content">
          <form className="form">
            <div className="form-group">
              <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
              <BiRename className='form-svg' />
            </div>
            <div className="form-group">
              <input type="text" className="form-input" value={category} />
              <BiSolidCategory className='form-svg' />
            </div>
            <div className="form-group">
              <input type="text" className="form-input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              <AiOutlineNumber className='form-svg' />
            </div>
            <div className="form-group">
              <input type="text" className="form-input" value={price} onChange={(e) => setPrice(e.target.value)} />
              <BiDollar className='form-svg' />
            </div>
            <div className="form-group">
              {error && <p className="error-message">*{error}</p>}
              <button className="btn btn-blue" onClick={(e) => handleSubmit(e, product[0]._id)}>Modifier</button>
            </div>
          </form>
      </div>
      </div>
    </div>
  )
}

export default ProductUpdate
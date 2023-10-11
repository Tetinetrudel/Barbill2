import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { fetchAddProduct } from '../../api/products/Products'
import { fetchAllCategories } from '../../api/categories/Categories'

import { AiOutlineClose, AiOutlineNumber } from 'react-icons/ai'
import { BiDollar, BiSolidCategory, BiRename } from 'react-icons/bi'


import '../../pages/products/Products.css'


const AddProduct = ({ props, setIsOpen }) => {
  const accessToken = useSelector((state) => state.authReducer.token)
  const [categories, setCategories] = useState([])

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [error, setError] = useState("")
  
  const handleGetAllCategories = async () => {
    try {
      const result = await fetchAllCategories(accessToken)
      if(result.success) {
        setCategories(result.categories)
      }
      else {
        console.error(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    handleGetAllCategories()
  }, [])

  const handleSubmit = async (e) => {
      e.preventDefault()
      const payload ={name, category, quantity, price}
      try {
        const result = await fetchAddProduct(accessToken, payload)
        if(result.success) {
          props.setIsUpdated(!props.isUpdated)
          setIsOpen(false)
        } else {
          setError(result.message)
        }
      } catch (error) {
        throw new Error(error)
      }
  }

  const selectCategory = (e) => {
    e.preventDefault()
    if (e.currentTarget.value === "0") {
      setCategory("")
    } else {
      setCategory(e.target.value)
    }
  }

  return (
    <div className='product-update-modal-backdrop'>
      <div className="product-update-modal-wrapper">
        <div className="product-update-header">
          <h2>Ajouter un produit</h2>
          <AiOutlineClose onClick={() => setIsOpen(false)} />
        </div>
        <div className="product-update-content">
          <form className="form">
            <div className="form-group">
              <input 
                type="text" 
                className="form-input" 
                value={name} 
                placeholder="Nom du produit"
                onChange={(e) => setName(e.target.value)} 
              />
              <BiRename className='form-svg' />
            </div>
            <div className='form-group'>
              <select className='form-input' onChange={selectCategory}>
                <option value="0">Selectionnez une catégorie</option>
                {categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
              </select>
              <BiSolidCategory className='form-svg' />
            </div>
            <div className="form-group">
              <input 
                type="number" 
                className="form-input" 
                value={quantity} 
                placeholder="Quantité"
                onChange={(e) => setQuantity(e.target.value)} 
              />
              <AiOutlineNumber className='form-svg' />
            </div>
            <div className="form-group">
              <input 
                type="number" 
                className="form-input" 
                value={price} 
                placeholder="Prix unitaire"
                onChange={(e) => setPrice(e.target.value)} 
              />
              <BiDollar className='form-svg' />
            </div>
            <div className="form-group">
              {error && <p className="error-message">*{error}</p>}
              <button className="btn btn-blue" onClick={handleSubmit}>Ajouter</button>
            </div>
          </form>
      </div>
      </div>
    </div>
  )
}

export default AddProduct
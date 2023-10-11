import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { fetchAllProducts } from '../../api/products/Products'
import { fetchAddProductToClient } from '../../api/clients/Clients'

import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'

import '../../pages/clients/Clients.css'


const AddProductToClient = ({ clientId, isOpen, setIsOpen, isUpdated, setIsUpdated, isUpdatedDetails, setIsUpdatedDetails }) => {
    const accessToken = useSelector((state) => state.authReducer.token)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [queryValue, setQueryValue] = useState("")

    const handleGetAllProducts = async () => {
        const result = await fetchAllProducts(accessToken)
        if(result.success) {
            setProducts(result.products)
            setFilteredProducts(result.products)
        } else {
            console.error(result.message)
        }
    }

    useEffect(() => {
        handleGetAllProducts()
    }, [])

    const handleAddProductToClient = async (productId) => {
        try {
            const result = await fetchAddProductToClient(accessToken, clientId, productId)
            if(result.success) {
                setIsUpdatedDetails(!isUpdatedDetails)
                setIsUpdated(!isUpdated)
                setIsOpen(false)
            } else {
                console.error(result.message)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

  return (
    <div className='client-addproduct-modal-backdrop'>
        <div className="client-addproduct-modal-wrapper">
            <div className="client-add-product-header">
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-input" 
                        placeholder='Chercher un produit'
                        value={queryValue} 
                        onChange={(e) => setQueryValue(e.target.value)}
                    />
                    <BiSearch className='form-svg'/>
                </div>
                <AiOutlineClose className='icon-cursor' onClick={() => setIsOpen(!isOpen)}/>
            </div>
            <div className="client-addproduct-content">
                <ul className="client-addproduct-items">
                {filteredProducts.map((item) => (
                    <li className='client-addproduct-item' key={item._id}>
                        <p>{item.name}</p>
                        <AiOutlinePlus onClick={() => handleAddProductToClient(item._id)}/>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AddProductToClient
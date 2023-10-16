import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { fetchAllProducts } from '../../api/products/Products'
import { fetchAddProductToClient } from '../../api/clients/Clients'

import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BiSearch, BiChevronDown, BiChevronUp } from 'react-icons/bi'

import '../../pages/clients/Clients.css'

const AddProductToClient = ({ clientId, isOpen, setIsOpen, isUpdated, setIsUpdated, isUpdatedDetails, setIsUpdatedDetails }) => {
    const accessToken = useSelector((state) => state.authReducer.token)

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [queryValue, setQueryValue] = useState("")

    const [showCategory, setShowCategory] = useState(null)

    const uniqueCategories = Array.from(new Set(products.map(product => product.category.name)))

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

    useEffect(() => {
        if(queryValue === "") {
            setFilteredProducts(products)
        }
        const filtered = products.filter((product) => product.name.toLowerCase().includes(queryValue.toLowerCase()))
        setFilteredProducts(filtered)
    }, [queryValue])

    const handleAddProductToClient = async (productId) => {
        try {
            const result = await fetchAddProductToClient(accessToken, clientId, productId)
            if(result.success) {
                setIsUpdatedDetails(!isUpdatedDetails)
                setIsUpdated(!isUpdated)
            } else {
                console.error(result.message)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    
  return (
    <div className='client-addproduct-modal-backdrop'>
        <div style={{width: "600px" }} className="client-addproduct-modal-wrapper">
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
                {uniqueCategories.length === 0 && <p>Veuillez ajouter des produits pour en ajouter aux clients</p>}
                {uniqueCategories.map(category => (
                    <div className="category-item" key={category}>
                    <div className="category-item-title">
                        <h2>{category}</h2>
                        {showCategory === category ? <BiChevronUp onClick={() => setShowCategory(null)} /> : <BiChevronDown onClick={() => setShowCategory(category)}/>}
                    </div>
                    {showCategory === category && (
                        <ul>
                        {filteredProducts
                            .filter(product => product.category.name === category)
                            .map(product => (
                            <li key={product.id}>
                                <p>{product.name}</p>
                                <AiOutlinePlus onClick={() => handleAddProductToClient(product._id)} />
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AddProductToClient
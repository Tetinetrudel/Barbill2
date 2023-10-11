import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { fetchAllProducts } from '../../api/products/Products'

import ProductsHeader from '../../features/products/ProductsHeader'
import ProductsList from '../../features/products/ProductsList'

import './Products.css'

const Products = () => {

  const accessToken = useSelector((state) => state.authReducer.token)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [error, setError] = useState("")
  const [isUpdated, setIsUpdated] = useState(false)

  const handleGetAllProducts = async () => {
    try {
      const result = await fetchAllProducts(accessToken)
      if(result.success) {
        setProducts(result.products)
        setFilteredProducts(result.products)
      } else {
        setError(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    handleGetAllProducts()
  }, [isUpdated])

  const props = {error, setError, isUpdated, setIsUpdated }

  return (
    <main className='products'>
      <ProductsHeader 
        props={props}
        products={products}
        setFilteredProducts={setFilteredProducts} 
        isUpdated={isUpdated} 
      />
      <ProductsList 
        products={products}
        filteredProducts={filteredProducts}
        error={error}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
    </main>
  )
}

export default Products
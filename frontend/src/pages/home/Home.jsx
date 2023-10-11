import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { fetchAllProducts } from '../../api/products/Products'

import Dashboard from '../../features/dashboard/Dashboard'
import UniqueInvoice from '../../features/invoices/UniqueInvoice'

import './Home.css'
const Home = () => {
  const accessToken = useSelector((state) => state.authReducer.token)

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)

  const handleGetAllProducts = async () => {
    try {
      const result = await fetchAllProducts(accessToken)
      if(result.success) {
        setProducts(result.products)
        setFilteredProducts(result.products)
        setIsLoading(false)
      } else {
        setError(result.error)
        setIsLoading(false)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    handleGetAllProducts()
  }, [isUpdated])

  const props = { products, filteredProducts, setFilteredProducts, error, isLoading, setIsLoading, isUpdated, setIsUpdated }
  return (
    <div className='home'>
      <Dashboard props={props} />
      <UniqueInvoice />
    </div>
  )
}

export default Home
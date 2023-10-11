import React, { useState, useEffect } from 'react'

import { BiSearch } from 'react-icons/bi'

import '../../pages/products/Products.css'

const ProductsFilter = ({ products, setFilteredProducts }) => {

  const [queryFilter, setQueryFilter] = useState("")

  useEffect(() => {
    if(!queryFilter) {
      setFilteredProducts(products)
    }
    
    if(queryFilter) {
      const filtered = products.filter((item) => item.name.toLowerCase().includes(queryFilter.toLowerCase()))
      setFilteredProducts(filtered)
    }
  }, [queryFilter])

  return (
    <div className='products-filter'>
      <div className="products-filter-search">
        <input 
          type="search" 
          className="products-filter-search-input" 
          placeholder="Trouver un produits"
          value={queryFilter} 
          onChange={(e) => setQueryFilter(e.target.value)} 
        />
        <BiSearch />
      </div>
    </div>
  )
}

export default ProductsFilter
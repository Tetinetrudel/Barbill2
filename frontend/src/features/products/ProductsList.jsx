import React from 'react'

import ProductsTable from './ProductsTable'

import '../../pages/products/Products.css'

const ProductsList = ({ products, filteredProducts, error, isUpdated, setIsUpdated }) => {
  return (
    <div className='products-list'>
      <ProductsTable 
        products={products} 
        filteredProducts={filteredProducts} 
        error={error} 
        isUpdated={isUpdated} 
        setIsUpdated={setIsUpdated} 
      />
    </div>
  )
}

export default ProductsList
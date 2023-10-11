import React, { useState } from 'react'

import ProductsFilter from './ProductsFilter'

import '../../pages/products/Products.css'
import AddProduct from './AddProduct'

const ProductsHeader = ({ products, setFilteredProducts, props  }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddProduct = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='products-header'>
      {isOpen && <AddProduct props={props} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className="products-header-title">
        <h1>Liste des produits</h1>
        <div className="products-header-button">
          <button className="btn btn-blue" onClick={handleAddProduct}>+ ajouter un produit</button>
        </div>
      </div>
      <div className="products-header-filter">
        <ProductsFilter 
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
    </div>
  )
}

export default ProductsHeader
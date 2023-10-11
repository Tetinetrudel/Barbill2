import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { fetchAllCategories } from '../../api/categories/Categories'

import '../../pages/home/Home.css'

const CategoryFilter = ({ props }) => {
  const accessToken = useSelector((state) => state.authReducer.token)

  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")

  const [activeCategory, setActiveCategory] = useState(0)

  const handleGetAllCategories = async () => {
    try {
      const result = await fetchAllCategories(accessToken)
      if(result.success) {
        setCategories(result.categories)
      } else {
        setError(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    handleGetAllCategories()
  }, [])

  useEffect(() => {
    if(activeCategory === 0) {
      props.setFilteredProducts(props.products)
      return
    }
    const filtered = props.products.filter((item) => item.category._id === activeCategory)
    props.setFilteredProducts(filtered)
  }, [activeCategory])

  if(!categories) {
    return <p>{error}</p>
  }

  return (
    <div className='category-filter'>
      {categories.length > 0 && <span className='pills pills-filter' value="0" onClick={() => setActiveCategory(0)}>Toutes les produits</span>}
      {categories.length > 0 && categories.map((category) => (
        <span className='pills pills-filter' key={category._id} onClick={() => setActiveCategory(category._id)}>{category.name}</span>
      ))}
    </div>
  )
}

export default CategoryFilter
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import CategorySettings from '../../features/settings/CategorySettings'
import EmployeeSettings from '../../features/employees/EmployeeSettings'

import { fetchAllCategories, fetchAddCategory, fetchDeleteCategory } from '../../api/categories/Categories'

import './Settings.css'

const Settings = ({ employeeProps }) => {
  
  const accessToken = useSelector((state) => state.authReducer.token)
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isUpdated, setIsUpdated] = useState(false)
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false)
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false)

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
    }, [isUpdated])

    const handleDeleteCategory = async (categoryId) => {
      const result = await fetchDeleteCategory(accessToken, categoryId)
      if(result.success) {
          setIsUpdated(!isUpdated)
      } else {
          alert(result.message)
          console.log(result.error)
      }
    }
    
    const handleAddCategory = async () => {
      const payload = { name }
      try {
        const result = await fetchAddCategory(accessToken, payload)
        if(result.success) {
          setIsOpenAddCategory(false)
          setIsUpdated(!isUpdated)
          setName("")
        } else {
          setError(result.message)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    const props = { categories, setCategories, name, setName, error, setError, 
      isUpdated, setIsUpdated, handleDeleteCategory, handleAddCategory, isOpenAddCategory, setIsOpenAddCategory,
      isOpenEditCategory, setIsOpenEditCategory }

  return (
    <main className='settings'>
      <CategorySettings props={props} />      
      <EmployeeSettings employeeProps={employeeProps} />
    </main>
  )
}

export default Settings
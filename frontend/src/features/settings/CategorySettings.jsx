import React, { useState, useEffect } from 'react'

import AddCategory from '../categories/AddCategory'
import CategoryUpdate from '../categories/CategoryUpdate'

import { BiEdit, BiTrash } from 'react-icons/bi'

const CategorySettings = ({ props }) => {
    
  return (
    <div className='shadow-box'>
        <div className="category-settings">
            <div className="category-setting-header">
                <h1>Catégories</h1>
            </div>
            <div className="category-setting-content">
                <div className="category-setting-content-item">
                    <div className="category-settings-content-item-box">
                        <h3>Nom des catégories</h3>
                        {props.categories.length === 0 && <p>Aucune catégorie</p>}
                        {props.categories.map((category) => (
                            <div key={category._id} className="category-setting-item-box">
                                <p>{category.name}</p>
                                <div className="category-setting-item-action">
                                    <BiEdit onClick={() => props.setIsOpenEditCategory(!props.isOpenEditCategory)}/>
                                    <BiTrash onClick={() => props.handleDeleteCategory(category._id)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        style={{maxWidth: "fit-content"}} 
                        className="btn btn-outlined-blue"
                        onClick={() => props.setIsOpenAddCategory(!props.isOpenAddCategory)}
                    >Ajouter une catégorie</button>
                    {props.isOpenAddCategory && <AddCategory props={props} />}
                    {props.isOpenEditCategory && <CategoryUpdate />}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategorySettings
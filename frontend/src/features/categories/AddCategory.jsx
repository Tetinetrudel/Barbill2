import React from 'react'

import { AiOutlineClose } from 'react-icons/ai'

import './Categories.css'

const Addcategory = ({ props }) => {
  return (
    <div className="modal-backdrop">
        <div className="modal-wrapper">
            <div className="update-password-header">
                <h1>Ajouter une catégorie</h1>
                <AiOutlineClose onClick={() => props.setIsOpenAddCategory(!props.isOpenAddCategory)} />
            </div>
            <div className="update-password-content">
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-input" 
                        value={props.name} 
                        onChange={(e) => props.setName(e.target.value)}
                        placeholder=' '
                    />
                    <label className="form-label">Nom de la catégorie</label>
                </div>
                {props.error && <p className='error-message'>{props.error}</p>}
            </div>
            <div className='update-password-button'>
                <button className="btn btn-blue" onClick={props.handleAddCategory}>Sauvegarder</button>
            </div>
        </div>
    </div>
  )
}

export default Addcategory
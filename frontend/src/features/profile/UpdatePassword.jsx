import React from 'react'

import { AiOutlineClose } from 'react-icons/ai'

import '../../pages/profile/Profile.css'

const UpdatePassword = ({ props }) => {
  return (
    <div className="modal-backdrop">
        <div className="modal-wrapper">
            <div className="update-password-header">
                <h1>Changer le mot de passe</h1>
                <AiOutlineClose onClick={() => props.setIsUpdatePassword(!props.isUpdatePassword)} />
            </div>
            <div className="update-password-content">
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-input" 
                        value={props.password} 
                        onChange={(e) => props.setPassword(e.target.value)}
                        placeholder='Mot de passe actuel'
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-input" 
                        value={props.newPassword} 
                        onChange={(e) => props.setNewPassword(e.target.value)}
                        placeholder='Nouveau mot de passe'
                    />
                </div>
                {props.error && <p className='error-message'>{props.error}</p>}
            </div>
            <div className='update-password-button'>
                <button className="btn btn-blue" onClick={props.handleSubmitPassword}>Sauvegarder</button>
            </div>
        </div>
    </div>
  )
}

export default UpdatePassword
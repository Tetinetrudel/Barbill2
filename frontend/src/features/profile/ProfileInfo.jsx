import React from 'react'

import { AiOutlineUser } from 'react-icons/ai'
import { MdAlternateEmail } from 'react-icons/md'

const ProfileInfo = ({ props }) => {
  return (
    <div className="shadow-box">
    <div className="profile-header">
      <h1>Profile</h1>
    </div>
    <div className="profile-content">
      <div className="profile-content-item">
        <h3>Nom de l'entrperise</h3>
        {props.isUpdateCompany ? (
            <div className="form-group">
                <input className="form-input" type="text" value={props.company} onChange={(e) => props.setCompany(e.target.value)} />
                <AiOutlineUser className='form-svg' />
            </div>
        ) : (
          <p>{props.company}</p>
        )}
        <button style={{ width: "75px", marginLeft: "10px" }} className='btn btn-outlined-blue' onClick={() => props.setIsUpdateCompany(!props.isUpdateCompany)}>
          {props.isUpdateCompany ? "Annuler" : "Modifier"}
        </button>
      </div>
      <div className="profile-content-item">
        <h3>Courriel</h3>
        {props.isUpdateEmail ? (
          <div className="form-group">
            <input className="form-input" type="text" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
            <MdAlternateEmail className='form-svg' />
          </div>
        ) : (
          <p>{props.email}</p>
        )}
        <button style={{ width: "75px", marginLeft: "10px" }} className='btn btn-outlined-blue' onClick={() => props.setIsUpdateEmail(!props.isUpdateEmail)}>
          {props.isUpdateEmail ? "Annuler" : "Modifier"}
        </button>
      </div>
      <div style={{ width: '100px' }}>
        <button className={`btn ${props.isUpdateCompany || props.isUpdateEmail ? 'btn-blue' : 'btn-disabled'}`} onClick={props.handleSubmitUpdateUser}>Sauvegarder</button>
      </div>
    </div>
  </div>
  )
}

export default ProfileInfo
import React from 'react'

import UpdatePassword from './UpdatePassword'

import { AiOutlineUser } from 'react-icons/ai'

const ProfileSecurity = ({ props }) => {
  return (
    <div className="shadow-box">
    <div className="profile-header">
      <h1>Sécurité</h1>
    </div>
    <div className="profile-content">
      <div style={{ justifyContent: "space-between"}} className="profile-content-item">
        <h3>Mot de passe</h3>
        <button style={{ width: "75px", marginLeft: "10px" }} className='btn btn-outlined-blue' onClick={() => props.setIsUpdatePassword(!props.isUpdatePassword)}>
          {props.isUpdatePassword ? "Annuler" : "Modifier"}
        </button>
      </div>
      {props.isUpdatePassword && <UpdatePassword props={props} />}
    </div>
  </div>
  )
}

export default ProfileSecurity